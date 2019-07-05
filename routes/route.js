const bodyParser = require('body-parser')
const express = require('express');
const router = express.Router();
const database = require('../database');


var urlencodedParser = bodyParser.urlencoded({ extended: false });


router.get('/', (req, res) => {
    res.render("home");
});

router.post('/addLink', urlencodedParser, function(req, res){
    database.insert(req.body);
    res.redirect("/");
});

router.get('*', (req, res) => {
    res.send("404 page not found");
});



module.exports = router;