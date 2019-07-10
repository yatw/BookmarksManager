const mysql = require('mysql');
const moment = require('moment');

// To connect to mysql
//https://stackoverflow.com/questions/50093144/mysql-8-0-client-does-not-support-authentication-protocol-requested-by-server
// run in mysql
//ALTER USER 'root'@'localhost' IDENTIFIED WITH mysql_native_password BY 'smooth';
var db = mysql.createConnection({
  host     : 'localhost',
  user     : 'root',
  password: 'smooth',
  dateStrings: 'date'
});

db.connect((err) => { 
if (err){
    console.log('Error connecting to MySQL...');
    throw err;
}else{
  console.log('MySQL connected...');
}
});

function usedatabase(){

  db.query('USE infoCluster',  (err, result) => {
      if (err) throw err;
   }); 
}

function insert (input) {
  usedatabase();

  input['createdDate'] = moment(Date.now()).format('YYYY-MM-DD');
  input['star'] = false;
  input['completed'] = false;
  
  db.query('INSERT INTO links SET ?', input,  (err, result) => {
      if (err) throw err;
  });  
}

function getLinks(callback){
  usedatabase();
  
  db.query('SELECT * FROM links;',  (err, result) => {
      if (err) throw err;
      callback(result);
  });
}

// both star and read are checkbox and use this function
function checkbox(input){
  usedatabase();

  let sql = 'UPDATE links SET ?? = ? WHERE linkId = ?;';

  db.query(sql, [input.field, input.status, input.linkId], (err, result) => {
      if (err) throw err;
  });
}

module.exports.insert = insert;
module.exports.getLinks = getLinks;
module.exports.checkbox = checkbox;

