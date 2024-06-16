const express = require('express');
const router = express.Router();

router.get('/index', (req, res) =>
{
    res.render('index');
});

router.get('/register', (req, res) => {
    const message = req.query.message;
    res.render('register', { message });
});

router.get('/homepage', (req, res) => {
    const message = req.query.message;
    res.render('homepage', { message });
});

module.exports = router;