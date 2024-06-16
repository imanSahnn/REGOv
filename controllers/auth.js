const mysql = require("mysql");
const bcrypt = require('bcryptjs');

const db = mysql.createConnection({
    host: process.env.HOST,
    user: process.env.USER,
    password: process.env.PASSWORD,
    database: process.env.DATABASE
});

exports.register = (req, res) => {
    console.log(req.body);

    const { name, email, password, cpassword } = req.body;

    db.query('SELECT email FROM users WHERE email = ?', [email], async (error, results) => {
        if (error) {
            console.log(error);
            return res.redirect('/register?message=An error occurred');
        }
        if (results.length > 0) {
            return res.redirect('/register?message=That email has already been used');
        } else if (password !== cpassword) {
            return res.redirect('/register?message=Passwords do not match');
        }

        let hashedPassword = await bcrypt.hash(password, 8);
        console.log(hashedPassword);

        db.query('INSERT INTO users SET ?', { name: name, email: email, password: hashedPassword }, (error, results) => {
            if (error) {
                console.log(error);
                return res.redirect('/register?message=An error occurred');
            } else {
                return res.redirect('/register?message=User registered successfully');
            }
        });
    });
};

exports.login = (req, res) => {
    const { email, password } = req.body;

    if (!email || !password) {
        return res.redirect('/index?message=Please provide email and password');
    }

    db.query('SELECT * FROM users WHERE email = ?', [email], async (error, results) => {
        if (error) {
            console.log(error);
            return res.redirect('/index?message=An error occurred');
        }
        if (results.length == 0 || !(await bcrypt.compare(password, results[0].password))) {
            return res.redirect('/index?message=Email or password is incorrect');
        } else {
            return res.redirect('/homepage?message=Login successful');
        }
    });
};

exports.logout = (req, res) => {
    return res.redirect('/index?message=Logout successful');
};

