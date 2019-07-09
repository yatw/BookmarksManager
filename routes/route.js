const bodyParser = require('body-parser')
const express = require('express');
const router = express.Router();
const database = require('../database');
const request = require('request');
const cheerio = require('cheerio');

var urlencodedParser = bodyParser.urlencoded({ extended: false });



router.get('/', (req, res) => {
    
    database.getLinks(function(result) {
        res.render("home", {links: result});
    });
});

router.post('/getTitle', urlencodedParser, function(req, res){
    
    request(req.body.url, function (error, response, body) {

        if (!error && response.statusCode == 200) {

          const $ = cheerio.load(body);
          var webpageTitle = $("title").text();
          var metaDescription =  $('meta[name=description]').attr("content");

          if (webpageTitle != undefined && webpageTitle.length >= 100){
            webpageTitle = webpageTitle.substring(0, 100) + "...";
          }

          if (metaDescription != undefined && metaDescription.length >= 150){
            metaDescription = metaDescription.substring(0, 150) + "...";
          }
          
          const webpage = {
            status: "success",
            title: webpageTitle,
            metaDescription: metaDescription
          }

          res.send(webpage);
        }else{
            res.send({
                status: "fail"
            })
        }
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