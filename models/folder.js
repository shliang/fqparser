module.exports = function(mongoose) {
	var FolderSchema = new mongoose.Schema({
		name: String,
		procedures:[{
			Description: String,
			Frequency: {type: Number, default: 0 },
			Deadline: {type: Number, default: 0} 
		}]
	});
	
	return {
		Folder: mongoose.model('Folder', FolderSchema)
	}
}