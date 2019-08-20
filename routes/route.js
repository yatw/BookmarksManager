const bodyParser = require('body-parser')
const express = require('express');
const router = express.Router();
const database = require('../database');
const request = require('request');
const cheerio = require('cheerio');

var urlencodedParser = bodyParser.urlencoded({ extended: false });

router.post('/displayLinks', urlencodedParser, function(req, res){

  database.displayLinks(req.body, function(result) {
    res.json(result);
  });
});

router.get('/getLinksCount', (req, res) => {
  
  database.getLinksCount(function(result) {
      res.json(result);
  });
});

router.post('/getTitle', urlencodedParser, function(req, res){

    var url = req.body.url.trim();
    
    database.checkExist(url, function(result) {

      var count = result.count; // count url that is the same in database

      request(url, function (error, response, body) {

          if (!error) {

            const $ = cheerio.load(body);
            var webpageTitle = $("title").text();
            var metaDescription =  $('meta[name=description]').attr("content");

            if (webpageTitle != undefined && webpageTitle.length >= 100){
              webpageTitle = webpageTitle.trim().substring(0, 100) + "...";
            }

            if (metaDescription != undefined && metaDescription.length >= 150){
              metaDescription = metaDescription.trim().substring(0, 150) + "...";
            }
            
            const webpage = {
              status: count == 0? "success" : "duplicate", 
              title: webpageTitle,
              metaDescription: metaDescription,
              statusCode: response.statusCode
            }

            res.send(webpage);
          }else{
              res.send({
                  status: "fail",
                  input: url
              })
          }

      });
        
    });
    
});

router.post('/insertLink', urlencodedParser, function(req, res){

  database.insertLink(req.body, function(result) {
    res.json(result);
  });

});

router.post('/updateLink', urlencodedParser, function(req, res){

  database.updateLink(req.body, function(result) {
    res.json(result);
  });

});

router.post('/deleteLink', urlencodedParser, function(req, res){

  database.deleteLink(req.body, function(result) {
    res.json(result);
  });

});

router.post('/checkbox', urlencodedParser, function(req, res){

  database.checkbox(req.body, function(result) {
    res.json(result);
  });
});

router.post('/search', urlencodedParser, function(req, res){

  database.search(req.body, function(result) {
    res.json(result);
  });
});


router.get('*', (req, res) => {

   res.send("404 page not found");
});



module.exports = router;