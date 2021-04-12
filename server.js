require('./models/db');
//const connection = require("./model");
const express = require("express");
var router = express.Router()

const app = express();
const path = require("path");
const expressHandleBars = require("express-handlebars");
const bodyparser = require("body-parser");
const patientController = require("./controllers/patientController");
const {allowInsecurePrototypeAccess} = require('@handlebars/allow-prototype-access');
app.use(bodyparser.urlencoded({
	extended : true
}));

app.use(express.json());
app.use(express.static('public'));

app.use(bodyparser.json());
app.set('views',path.join(__dirname,'/views/'));
const Handlebars = require('handlebars');

app.engine('hbs',expressHandleBars({
	handlebars: allowInsecurePrototypeAccess(Handlebars),
	extname : 'hbs',
	defaultLayout : 'mainLayout',
	layoutDir : __dirname + 'views/layouts'
}));

app.set('view engine','hbs');

/*application.get("/",(req,res)=>{
	//res.send('<h1>hello there<h1>')
	res.render("index",{});
})*/


app.listen("3000",()=>{
	console.log("server started");
});

app.use("/patient", patientController);

//app.use('/route',router);

//module.exports = routers