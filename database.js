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

function insertLink (input) {
  usedatabase();

  input['createdDate'] = moment(Date.now()).format('YYYY-MM-DD');
  input['star'] = false;
  input['completed'] = false;
  
  db.query('INSERT INTO links SET ?', input,  (err, result) => {
      if (err) throw err;
  });  
}

function updateLink (input) {
  usedatabase();

  db.query('UPDATE links SET url = ?, title = ?, detail = ? WHERE linkId = ?', [input.url, input.title, input.detail, input.linkId],  (err, result) => {
      if (err) throw err;
  });  
}

function deleteLink (input) {
  usedatabase();

  db.query('DELETE FROM links WHERE linkId = ?;', [input.linkId],  (err, result) => {
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

function getLinksCount(callback){
  usedatabase();
  
  db.query('SELECT COUNT(*) as count FROM links;',  (err, result) => {
      if (err) throw err;
      callback(result);
  });
  
}

function search(input, callback){
  usedatabase();

  db.query('SELECT * FROM links WHERE ( title LIKE ? OR detail LIKE ?)', [input.query, input.query], (err, result) => {
      if (err) throw err;
      callback(result);
  });
}

function checkExist(input, callback){
  usedatabase();

  var query = db.query('SELECT COUNT(*) as count FROM links WHERE url=?', [input], (err, result) => {
      if (err) throw err;
      callback(result[0]);
  });

  //console.log(query.sql);
}


// both star and read are checkbox and use this function
function checkbox(input){
  usedatabase();

  db.query('UPDATE links SET ?? = ? WHERE linkId = ?;', [input.field, input.status, input.linkId], (err, result) => {
      if (err) throw err;
  });
}

module.exports.checkExist = checkExist;
module.exports.deleteLink = deleteLink;
module.exports.insertLink = insertLink;
module.exports.getLinks = getLinks;
module.exports.getLinksCount = getLinksCount;
module.exports.checkbox = checkbox;
module.exports.updateLink = updateLink;
module.exports.search = search;

