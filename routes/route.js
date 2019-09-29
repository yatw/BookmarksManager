const bodyParser = require('body-parser')
const express = require('express');
const router = express.Router();
const database = require('../database');
const request = require('request');
const cheerio = require('cheerio');
require('dotenv').config();


var urlencodedParser = bodyParser.urlencoded({ extended: false });

// disable insert, update or delete for visitors
const ignoreGuestRequest = (req, res, next) => {

  if (req.session.userName === process.env.Name){
    next();
  }else{
    res.json({status: "ignored"});
  }
}

router.get('/', urlencodedParser, function(req, res){
  console.log(req.session);
  if (req.session.views) {
    req.session.views++
    res.setHeader('Content-Type', 'text/html')
    res.write('<p>You are viewing in port 5000, to view in React, use 3000</p>')
    res.write('<p>views: ' + req.session.views + '</p>')
    res.write('<p>expires in: ' + (req.session.cookie.maxAge / 1000) + 's</p>')
    res.end()
  } else {
    req.session.views = 1
    res.end('welcome to the session demo. refresh!')
  }
});

router.get('/isLogin', urlencodedParser, function(req, res){

  var status = (req.session.userName) ? true : false;
  res.json({status: status});

});

router.post('/login', urlencodedParser, function(req, res){

  var nameInput = req.body.userName;

  if (nameInput === "guest" || nameInput === process.env.Name){
    req.session.userName = nameInput;

    res.json({status: true});
  }else{
    res.json({status: false});
  }

});


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
              status: result.count === 0? "success" : "duplicate", 
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

router.post('/insertLink', ignoreGuestRequest, urlencodedParser, function(req, res){

  database.insertLink(req.body, function(result) {
    res.json(result);
  });

});

router.post('/updateLink', ignoreGuestRequest, urlencodedParser, function(req, res){

  database.updateLink(req.body, function(result) {
    res.json(result);
  });

});

router.post('/deleteLink', ignoreGuestRequest, urlencodedParser, function(req, res){

  database.deleteLink(req.body, function(result) {
    res.json(result);
  });

});

router.post('/checkbox', urlencodedParser, function(req, res){

  database.checkbox(req.body, function(result) {
    res.json(result);
  });
});

router.post('/displayTags', urlencodedParser, function(req, res){

  database.displayTags(req.body, function(result) {
    res.json(result);
  });
});


router.post('/getSelectedTags', urlencodedParser, function(req, res){

  database.getSelectedTags(req.body, function(result) {
    res.json(result);
  });
});



router.get('*', (req, res) => {

   res.send("404 page not found");
});



module.exports = router;