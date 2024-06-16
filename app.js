const express = require("express"); 
const path = require('path');
const mysql = require("mysql");
const dotenv = require('dotenv');

dotenv.config({path: './.env'});

const app = express(); 

const db = mysql.createConnection(
    {
        host: process.env.HOST,
        user: process.env.USER,
        password: process.env.PASSWORD, 
        database: process.env.DATABASE
    }
);

const publicDirectory = path.join(__dirname, './public');
app.use(express.static(publicDirectory));
console.log(__dirname);

app.set('view engine', 'hbs');

db.connect((error) =>
{
   if(error){
    console.log(error)
   }
   else{
    console.log("mysql connected")
   }
})
app.get("/", (req, res) =>
{
    //res.send("<h1> Home Page </h1>")
    res.render("index")
});

app.get("/register", (req, res) =>
    {
        res.render("register")
    });

app.listen(5000, () =>{
    console.log("server started on Port 5000")
})
