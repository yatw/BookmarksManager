const mysql = require('mysql');
const moment = require('moment');

// To connect to mysql
//https://stackoverflow.com/questions/50093144/mysql-8-0-client-does-not-support-authentication-protocol-requested-by-server
// run in mysql
//ALTER USER 'root'@'localhost' IDENTIFIED WITH mysql_native_password BY 'smooth';

const db_config = {
  host     : 'us-cdbr-iron-east-02.cleardb.net',
  user     : 'bc0f607f95daca',
  password : '97ff4423',
  database : "heroku_af4745ddf02c336",
  dateStrings: 'date'
};

var connection;

// https://stackoverflow.com/questions/20210522/nodejs-mysql-error-connection-lost-the-server-closed-the-connection
function handleDisconnect() {
  connection = mysql.createConnection(db_config); // Recreate the connection, since
                                                  // the old one cannot be reused.

  connection.connect(function(err) {              // The server is either down
    if(err) {                                     // or restarting (takes a while sometimes).
      console.log('Error when connecting to db:', err);
      setTimeout(handleDisconnect, 2000); // We introduce a delay before attempting to reconnect,
    }else{
      console.log('MySQL connected ...');
    }                                     // to avoid a hot loop, and to allow our node script to
  });                                     // process asynchronous requests in the meantime.
                                          // If you're also serving http, display a 503 error.
  connection.on('error', function(err) {
    console.log('db error', err);
    if(err.code === 'PROTOCOL_CONNECTION_LOST') { // Connection to the MySQL server is usually
      handleDisconnect();                         // lost due to either server restart, or a
    } else {                                      // connnection idle timeout (the wait_timeout
      console.log("throw error");
      throw err;                                  // server variable configures this)
    }
  });
}

handleDisconnect();


function insertLink (input) {
 //usedatabase();

  input['createdDate'] = moment(Date.now()).format('YYYY-MM-DD');
  input['star'] = false;
  input['completed'] = false;
  
  connection.query('INSERT INTO links SET ?', input,  (err, result) => {
      if (err) throw err;
  });  
}

function updateLink (input) {
  //usedatabase();

  connection.query('UPDATE links SET url = ?, title = ?, detail = ? WHERE linkId = ?', [input.url, input.title, input.detail, input.linkId],  (err, result) => {
      if (err) throw err;
  });  
}

function deleteLink (input) {
  //usedatabase();

  connection.query('DELETE FROM links WHERE linkId = ?;', [input.linkId],  (err, result) => {
    if (err) throw err;
  });
}

function getLinks(callback){
  //usedatabase();
  
  connection.query('SELECT * FROM links;',  (err, result) => {
      if (err) throw err;
      callback(result);
  });
  
}

function getLinksCount(callback){
  //usedatabase();
  
  connection.query('SELECT COUNT(*) as count FROM links;',  (err, result) => {
      if (err) throw err;
      callback(result);
  });
  
}

function search(input, callback){
  //usedatabase();  

  var q = connection.query('SELECT * FROM links WHERE ( title LIKE ? OR detail LIKE ?)', ['%'+ input.query + '%', '%' + input.query + '%'], (err, result) => {
      if (err) throw err;
      callback(result);
  });

  console.log(q.sql);

}

function checkExist(input, callback){
  //usedatabase();

  var query = connection.query('SELECT COUNT(*) as count FROM links WHERE url=?', [input], (err, result) => {
      if (err) throw err;
      callback(result[0]);
  });

}


// both star and read are checkbox and use this function
function checkbox(input){
  //usedatabase();

  connection.query('UPDATE links SET ?? = ? WHERE linkId = ?;', [input.field, input.status, input.linkId], (err, result) => {
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

