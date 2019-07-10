const bodyParser = require('body-parser');
const express = require('express');
const path = require('path');


const app = express();

// set up static folder
app.use(express.static(path.join(__dirname, 'public')));

// parse application/x-www-form-urlencoded 
app.use(bodyParser.urlencoded({ extended: false }))
app.use(bodyParser.json())

// set up view engine
app.set('view engine', 'ejs');

// set up routes
app.use('/', require('./routes/route'));
app.use('/getTitle', require('./routes/route'));
app.use('/addLink', require('./routes/route'));
app.use('/checkbox', require('./routes/route'));
app.use('*', require('./routes/route'));



const PORT = process.env.PORT || 5000;
app.listen(PORT, ()=> console.log(`Server started on port ${PORT}`));