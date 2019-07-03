const bodyParser = require('body-parser')
const express = require('express');
const mysql = require('mysql');
const path = require('path');
const routes = require('./routes');

const app = express();


// To connect to mysql
//https://stackoverflow.com/questions/50093144/mysql-8-0-client-does-not-support-authentication-protocol-requested-by-server
var db = mysql.createConnection({
    host     : 'localhost',
    user     : 'root',
    password: 'smooth'
});

  db.connect((err) => {
    if (err){
        throw err;
    }
    console.log('mysql connected...');
});

var urlencodedParser = bodyParser.urlencoded({ extended: false });
var jsonParser = bodyParser.json();


app.set('view engine', 'ejs');
app.use(express.static(path.join(__dirname, 'public')));


app.get('/', routes.home);
app.get('*', routes.not_found);

app.post('/home', urlencodedParser, function (req, res) {
  console.log("wtf lets do it");
  console.log(req.body);
  res.send('welcome, ' + JSON.stringify(req.body));
  
})


const PORT = process.env.PORT || 5000;

app.listen(PORT, ()=> console.log(`Server started on port ${PORT}`));