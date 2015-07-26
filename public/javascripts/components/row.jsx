var React = require('react');

module.exports = React.createClass({
	render: function() {
		return (
			<tr>
				<td>{this.props.folderName}</td>
				<td>{this.props.row.Description}</td>
				<td>{this.props.row.Frequency}</td>
				<td>{this.props.row.Deadline}</td>
			</tr>
		)
	}
});