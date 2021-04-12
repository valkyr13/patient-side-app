const mongoose = require('mongoose');

var patientSchema = new mongoose.Schema({
	heartrate:{
		type: String
	},
	bodytemp:{
		type: String
	},
	symptoms:{
		type: String
	},
	diagnosis:{
		type: String
	}

});

mongoose.model('Patientdetail', patientSchema);