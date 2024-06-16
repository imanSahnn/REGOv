const express = require('express');
const router = express.Router();

router.get('/', (req, res) =>
{
    res.render('index');
});

router.get('/register', (req, res) => {
    const message = req.query.message;
    res.render('register', { message });
});

module.exports = router;