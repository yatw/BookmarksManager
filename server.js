const bodyParser = require('body-parser');
const express = require('express');
const path = require('path');

const app = express();

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
app.use('/displayLinks', require('./routes/route'));
app.use('/getLinksCount', require('./routes/route'));
app.use('/getTitle', require('./routes/route'));
app.use('/insertLink', require('./routes/route'));
app.use('/updateLink', require('./routes/route'));
app.use('/deleteLink', require('./routes/route'));
app.use('/checkbox', require('./routes/route'));
app.use('/search', require('./routes/route'));
app.use('*', require('./routes/route'));






const PORT = process.env.PORT || 5000;
app.listen(PORT, ()=> console.log(`Server started on port ${PORT}`));