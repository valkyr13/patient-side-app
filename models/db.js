const mongoose = require("mongoose");

mongoose.connect("mongodb://localhost:27017/patientDB", {useNewUrlParser: true , useUnifiedTopology: true },(error)=>{
	if(!error){
		console.log("Successfully connected")
	}
	else{
		console.log("Error connecting to Database",+error)
	}
});

require('./patient.model');