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
