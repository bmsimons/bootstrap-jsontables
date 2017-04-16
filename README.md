**Bootstrap-JSONTables**
--------------
A simple and quick extension to jQuery that allows you to:

 - Bootstrap table ➤ JSON data;
 - JSON data ➤ Bootstrap table;

It also has extra functionality to filter table data based on a search query.

Basic example:
```html
<table id="basicTable" class="table">
	<thead>
		<tr>
			<th>ID</th>
			<th>Name</th>
		</tr>
	</thead>
	<tbody>
		<tr>
			<td>1</td>
			<td>Bart</td>
		</tr>
		<tr>
			<td>2</td>
			<td>Nick</td>
		</tr>
		<tr>
			<td>3</td>
			<td>Jason</td>
		</tr>
	</tbody>
</table>
```

```javascript
$(document).ready(function()
{
	var jsonTable = new JSONTable($("#basicTable"))
	var tableData = jsonTable.toJSON()
	tableData.push({"ID":"4","Name":"Jack"})
	setTimeout(function()
	{
		jsonTable.fromJSON(tableData)
	}, 4000)
})
```
This should result in this table-structure in your DOM after 4 seconds:

```html
<table id="basicTable" class="table">
	<thead>
		<tr>
			<td>ID</td>
			<td>Name</td>
		</tr>
	</thead>
	<tbody>
		<tr>
			<td>1</td>
			<td>Bart</td>
		</tr>
		<tr>
			<td>2</td>
			<td>Nick</td>
		</tr>
		<tr>
			<td>3</td>
			<td>Jason</td>
		</tr>
		<tr>
			<td>4</td>
			<td>Jack</td>
	</tbody>
</table>
```

More examples are coming soon.
