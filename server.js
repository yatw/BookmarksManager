const bodyParser = require('body-parser');
const cors = require('cors');
const express = require('express');
const path = require('path');
const session = require('express-session');
require('dotenv').config();


const app = express();

const TEN_MIN = 1000 * 60 * 10;

var sess = {
  secret: process.env.sessionSecret,
  resave: false,
  saveUninitialized: true,
  cookie: {
    maxAge : TEN_MIN
  }
}

app.set('trust proxy', 1); // trust first proxy

app.use(session(sess));


var whitelist = ['http://localhost:5000/', 'http://localhost:3000', 'https://yatw-bookmark.herokuapp.com']
var corsOptions = {
  origin: function (origin, callback) {

    //If you do not want to block REST tools or server-to-server requests, add a !origin check in the origin function like so:
    if (whitelist.indexOf(origin) !== -1  || !origin) {
      callback(null, true)
    } else {
      console.log(origin);
      callback(new Error(origin,'Not allowed by CORS'))
    }
  
  }
}

app.use(cors(corsOptions));

app.use(function(req, res, next) {

  res.header("Access-Control-Allow-Origin", "*");

  res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");

  next();

});

// needed for auto extract title and detail
// parse application/x-www-form-urlencoded 
app.use(bodyParser.urlencoded({ extended: false }))
app.use(bodyParser.json())

// Serve static files from the React frontend app
app.use(express.static(path.join(__dirname, 'client/build')))


// set up routes
app.use('/', require('./routes/route'));
app.use('/isLogin', require('./routes/route'));
app.use('/login', require('./routes/route'));
app.use('/displayLinks', require('./routes/route'));
app.use('/getLinksCount', require('./routes/route'));
app.use('/getTitle', require('./routes/route'));
app.use('/insertLink', require('./routes/route'));
app.use('/updateLink', require('./routes/route'));
app.use('/deleteLink', require('./routes/route'));
app.use('/displayTags', require('./routes/route'));
app.use('/getSelectedTags', require('./routes/route'));
app.use('/checkbox', require('./routes/route'));
app.use('*', require('./routes/route'));






const PORT = process.env.PORT || 5000;
app.listen(PORT, ()=> console.log(`Server started on port ${PORT}`));