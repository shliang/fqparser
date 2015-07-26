var React = require('react');
var Row = require('./row');

module.exports = React.createClass({
	render: function() {
		return (
			<table className="table">
				<thead>
					<tr>
				    <th>Name</th>
						<th>Description</th>
						<th>Frequency</th>
						<th>Deadline</th>
					</tr>
				</thead>
				<tbody>{this.renderTableBody()}</tbody>
			</table>
		);
	},
	
	renderTableBody: function() {
		var rows = [];
		this.props.folders.forEach(function(document) {
			var folderName = document.name;
			document.procedures.forEach(function(row) {
				rows.push(<Row key={row._id} row={row} folderName={folderName} />);
			});
		});
		return rows;
	}
});