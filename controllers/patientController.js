var express = require('express')
var router = express.Router()
const bodyParser = require("body-parser");
const mongoose = require('mongoose');
const Patientdetail = mongoose.model('Patientdetail');
const {allowInsecurePrototypeAccess} = require('@handlebars/allow-prototype-access')

router.get('/',(req,res) =>{
	res.render("patient/addOrEdit",{
		viewTitle:"Insert Data"
	});

})

router.post('/',(req,res)=>{
  //console.log(req.body);
  if (req.body._id == '')
        insertData(req, res);
        else
        updateRecord(req, res);
});


function insertData(req,res){
	var patientdetail = new Patientdetail();
	patientdetail.heartrate = req.body.heartrate;
	patientdetail.bodytemp = req.body.bodytemp;
	patientdetail.symptoms = req.body.symptoms;
	patientdetail.diagnosis = req.body.diagnosis;
	patientdetail.save((err, doc) =>{
		if(!err){
			res.redirect('patient/list');
		}
		else{
			console.log('Error during record insertion: ' + err);
		}

	});

}


function updateRecord(req, res) {
    Patientdetail.findOneAndUpdate({ _id: req.body._id }, req.body, { new: true }, (err, doc) => {
        if (!err) { res.redirect('patient/list'); }
        else {
           console.log('Error during record update : ' + err);
        }
    });
}

router.get('/list',(req,res) =>{
	//res.json('from list');
	Patientdetail.find((err, docs) => {
        if (!err) {
            res.render("patient/list", {
                list: docs
            });
        } 
        else {
            console.log('Error in retrieving patient list :' + err);
        }
    });

});

router.get('/:id', (req, res) => {
    Patientdetail.findById(req.params.id, (err, doc) => {
        if (!err) {
            res.render("patient/addOrEdit", {
                viewTitle: "Update Details",
                patient: doc
            });
        }
    });
});

router.get('/delete/:id', (req, res) => {
    Patientdetail.findByIdAndRemove(req.params.id, (err, doc) => {
        if (!err) {
            res.redirect('/patient/list');
        }
        else { console.log('Error in employee delete :' + err); }
    });
});
//console.log(router)
module.exports = router