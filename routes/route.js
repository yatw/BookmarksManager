const bodyParser = require('body-parser')
const express = require('express');
const router = express.Router();
const database = require('../database');


var urlencodedParser = bodyParser.urlencoded({ extended: false });


router.get('/', (req, res) => {
    
    database.getLinks(function(result) {
        console.log(result);
        res.render("home", {links: result});
    });
});

router.post('/addLink', urlencodedParser, function(req, res){
    database.insert(req.body);
    res.redirect("/");
});

router.get('*', (req, res) => {
    res.send("404 page not found");
});



module.exports = router;