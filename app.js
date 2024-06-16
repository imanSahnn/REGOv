const express = require("express");
const path = require('path');
const mysql = require("mysql");
const dotenv = require('dotenv');
const session = require('express-session');
const flash = require('connect-flash');

dotenv.config({ path: './.env' });

const app = express();

const db = mysql.createConnection({
    host: process.env.HOST,
    user: process.env.USER,
    password: process.env.PASSWORD,
    database: process.env.DATABASE
});

const publicDirectory = path.join(__dirname, './public');
app.use(express.static(publicDirectory));
console.log(__dirname);

// Parse URL-encoded as HTML form
app.use(express.urlencoded({ extended: false }));
// Parse JSON as API client
app.use(express.json());

// Set up session middleware
app.use(session({
    secret: 'your_secret_key', // Replace with a strong secret key
    resave: false,
    saveUninitialized: true
}));

// Set up flash middleware
app.use(flash());

// Set up view engine
app.set('view engine', 'hbs');

db.connect((error) => {
    if (error) {
        console.log(error);
    } else {
        console.log("MySQL connected");
    }
});

// Define routes
app.use('/', require('./routes/pages'));
app.use('/auth', require('./routes/auth'));

app.listen(5000, () => {
    console.log("Server started on Port 5000");
});
