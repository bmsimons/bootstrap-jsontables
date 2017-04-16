function JSONTable(tableObject)
{
	this.table = tableObject

	this.toJSON = function()
	{
		tableHeaderArray = []
		tableHeader = this.table.find("th")
		for (var hc = 0; hc < tableHeader.length; hc++)
		{
			tableHeaderArray.push($(tableHeader[hc]).text())
		}

		var tableJsonObjectList = []

		tableRows = this.table.find("tr").has("td")
		for (var rc = 0; rc < tableRows.length; rc++)
		{
			tableJsonObject = {}
			tableRow = $(tableRows[rc]).children()
			for (var cc = 0; cc < tableRow.length; cc++)
			{
				tableJsonObject[tableHeaderArray[cc]] = tableRow[cc].innerText
			}
			tableJsonObjectList.push(tableJsonObject)
		}

		return tableJsonObjectList
	}

	this.tableJSON = this.toJSON()
	this.tableFullJSON = this.toJSON()
	this.isTableFiltered = false

	this.clearTable = function()
	{
		this.table.find("tr").has("td").remove()
	}

	this.fromJSON = function(jsonSourceData = this.tableJSON, setFullJSON = true)
	{
		if (jsonSourceData.length == 0)
		{
			this.clearTable()
			return
		}
		rootTableObject = this.table.clone().empty().append('<tr></tr>')
		rootHeaderRow = rootTableObject.find('tr')
		tableHeaderKeyArray = []
		tableHeaderKeys = Object.keys(jsonSourceData[0])
		for (var kc = 0; kc < tableHeaderKeys.length; kc++)
		{
			tableHeaderKeyArray.push(tableHeaderKeys[kc])
			$(rootHeaderRow).append('<th>'+tableHeaderKeys[kc]+'</th>')
		}
		for (var jr = 0; jr < jsonSourceData.length; jr++)
		{
			tableDataRow = $('<tr></tr>')
			for (var ki = 0; ki < tableHeaderKeyArray.length; ki++)
			{
				tableDataRow.append('<td>'+jsonSourceData[jr][tableHeaderKeyArray[ki]])
			}
			rootTableObject.append(tableDataRow)
		}
		this.table.html(rootTableObject)
		this.tableJSON = jsonSourceData
		if (setFullJSON)
		{
			this.tableFullJSON = jsonSourceData
		}
	}

	this.filter = function(searchQuery)
	{
		this.isTableFiltered = true
		resultList = []
		searchQuery = searchQuery.toLowerCase()
		sourceTableJSON = this.tableJSON
		sourceTableJSONLength = sourceTableJSON.length
		sourceTableKeys = Object.keys(sourceTableJSON[0])
		sourceTableKeysLength = sourceTableKeys.length
		for (var fj = 0; fj < sourceTableJSONLength; fj++)
		{
			for (tk = 0; tk < sourceTableKeysLength; tk++)
			{
				if (sourceTableJSON[fj][sourceTableKeys[tk]].toLowerCase().indexOf(searchQuery) != -1)
				{
					resultList.push(sourceTableJSON[fj])
					break
				}
			}
		}
		if (!searchQuery)
		{
			this.isTableFiltered = false
			this.tableJSON = this.tableFullJSON
			resultList = this.tableFullJSON

			this.fromJSON(resultList)
		}
		else
		{
			this.fromJSON(resultList, false)
		}
	}
}
