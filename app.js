const express = require("express");
const path = require("path")
const mysql = require("mysql");
const dotenv = require("dotenv");
const cookieParser = require("cookie-parser");

dotenv.config({path: './.env'});

const app = express();

const db = mysql.createConnection({
    host: process.env.DATABASE_HOST,
    user: process.env.DATABASE_USER,
    password: process.env.DATABASE_PASSWORD,
    database: process.env.DATABASE
});

const publicDirectory = path.join(__dirname, "./public")
app.use(express.static(publicDirectory));

//Parse URL_encoded bodies (as sent by HTML forms) (make usre can grab data from any form)
app.use(express.urlencoded({extended:false}));

//pasre JSON bodies (as sent by api client)
app.use(express.json());
app.use(cookieParser());


//html template 
app.set('view engine', 'hbs');

db.connect((err) =>{
    if(err) throw err;
    console.log ("Conntected to db")
})

//define routes
app.use('/', require('./routes/pages'));
app.use('/auth', require('./routes/auth'));


var server = app.listen(process.env.DATABASE_PORT || 3000, process.env.HOST, () =>{
    console.log("we are live at %s ", server.address());
})
    





