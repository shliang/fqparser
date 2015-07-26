var React = require("react");
var XLSX = require('xlsx');
var FolderStore = require('../stores/folder-store');
var Reflux = require('reflux');
var Actions = require('../actions');
var Table = require('./table');

module.exports = React.createClass({
	mixins: [
    Reflux.listenTo(FolderStore, 'onChange')
  ],
	
	getInitialState: function() {
		return {
			folders: []
		}
	},
	
	componentWillMount: function() {
    Actions.getFolders();
  },
	
	onChange: function(event, data) {
		if (event == 'sync') {
			this.setState({folders: data});
			console.log('Succesfully Fetched', JSON.stringify(data));	
		} else if (event = 'add') {
			this.setState({folders: this.state.folders.concat(data)});
			console.log("Succesfully Added", JSON.stringify(data));
		}
	},
	
  render: function() {
    return (
			<div>
				<form onChange={this.handleFileUpload}>
					<div className="form-group">
						<label>Upload file here</label>
			    	<input className="btn btn-default" type="file" name="thumbnail"/>
					</div>
				</form>
				<Table folders={this.state.folders} />
			</div>			
		);
  },
	
	handleFileUpload: function(event) {
		var file = event.target.files[0];
    var reader = new FileReader();
		var dataArr = [];
		
    reader.onload = function(e) {
      var data = e.target.result;
      var workbook = XLSX.read(data, {type: 'binary'});
			var sheetNameList = workbook.SheetNames;
			sheetNameList.forEach(function(y) {
				
			  var worksheet = workbook.Sheets[y];
				var dataObjArr = XLSX.utils.sheet_to_json(worksheet);
				
				// if sheet is empty, dataObjArr is an empty array 
				if (dataObjArr[0]) {
					var headers = Object.keys(dataObjArr[0]).filter(function(header) {
						return /^\s*FQ Folder\s*$/i.test(header)
							|| /^\s*Description\s*$/i.test(header)
							|| /^\s*Frequency\s*$/i.test(header)
							|| /^\s*Deadline\s*$/i.test(header);
						});	
				} else {
					var headers = [];
				}
					
				//some documents don't have deadlines, resulting in missing Deadline key for those documents
				headers.length === 3 ? headers.push(" Deadline ") : null;
			
				if (headers.length === 4) {
					var folders = dataArr.map(function(document) { return document.name;});
					var i, j;
					
					for (i = 0; i < dataObjArr.length; i++) {
						var obj = {};
						// FQ Folder header always comes before other headers, given in problem
						headers.slice(1).forEach(function(header) {
							var trimmedHeader = header.replace(/^\s+|\s+$/g, '');
							if (dataObjArr[i][header]) {
								if (/Frequency/i.test(trimmedHeader)) {
									//console.log(dataObjArr[i][header]);
									switch(dataObjArr[i][header]) {
									case " Monthly ":
										obj[trimmedHeader] = 1;
										break;
									case " Quarterly ":
										obj[trimmedHeader] = 2;
										break;
									case " Yearly ":
										obj[trimmedHeader] = 3;
										break;
									} 
								} else if (/Deadline/i.test(trimmedHeader)) {
									obj[trimmedHeader] = parseInt(dataObjArr[i][header], 10);
								} else {
									obj[trimmedHeader] = dataObjArr[i][header].replace(/^\s+|\s+$/g, '');
								}
							}
						});
						// FQ Folder header always comes before other headers, given in problem
						if ((j = folders.indexOf(dataObjArr[i][headers[0]].replace(/^\s+|\s+$/g, ''))) >= 0) {
							dataArr[j]['procedures'].push(obj);
						} else {
							dataArr.push({
								name: dataObjArr[i][headers[0]].replace(/^\s+|\s+$/g, ''),
								procedures: [obj]
							})
							folders.push(dataObjArr[i][headers[0]].replace(/^\s+|\s+$/g, ''));
						};
					}
				}
			});
			Actions.postFolders(dataArr);
    };
    reader.readAsBinaryString(file);
	}
});