const mysql = require('mysql');
const moment = require('moment');
require('dotenv').config();

// To connect to mysql
//https://stackoverflow.com/questions/50093144/mysql-8-0-client-does-not-support-authentication-protocol-requested-by-server
// run in mysql
//ALTER USER 'root'@'localhost' IDENTIFIED WITH mysql_native_password BY 'smooth';
const db_config = {
  host     : process.env.host,
  user     : process.env.user,
  password : process.env.password,
  database : process.env.database,
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


function insertLink (input, callback) {
  
  connection.query('INSERT INTO links SET title = ?, url = ?, detail = ?, createdDate = ?, star = ?, completed = ?', [input.title, input.url, input.detail, moment(Date.now()).format('YYYY-MM-DD'), false, false],  (err, result) => {
      if (err) {
        console.log(err);
        callback({"status":"error"});
        throw err;
      }
  });

  // for each tag, insert the relation into the linkTag table
  input.tags.forEach(function (tag, index) {

      connection.query('INSERT INTO linkTag (link, tag)  VALUES ((SELECT linkId FROM links WHERE url = ?), (SELECT tagId FROM tags WHERE name = ?));', [input.url, tag],  (err) => {
        if (err) {
          console.log(err);
          callback({"status":"error"});
          throw err;
        }
      });

  });

  callback({"status":"success"});
}

function updateLink (input, callback) {

  
  connection.query('UPDATE links SET url = ?, title = ?, detail = ? WHERE linkId = ?', [input.url, input.title, input.detail, input.linkId],  (err, result) => {
      if (err) {
        callback({"status":"error"});
        throw err;
      }
  });
  

  var c = "SELECT name FROM  \
          linkTag INNER JOIN tags on linkTag.tag = tags.tagId  \
          WHERE link = ?";
  

  // get this link's current selected tags
  connection.query(c, [input.linkId],  (err, result) => {
    if (err) {
      callback({"status":"error"});
      throw err;
    }
    
    var curSelected = [];
    result.forEach(function (tag, index) {

      if (!input.tags.includes(tag.name)){  // if this tag is now not needed, remove
        curSelected.push(tag.name);

        // delete each tag in the relation table
        
        
        connection.query('DELETE FROM linkTag WHERE link = ? AND tag = (SELECT tagId FROM tags WHERE name = ?);', [input.linkId, tag.name],  (err, result) => {
          if (err) {
            console.log(err);
            callback({"status":"error"});
            throw err;
          }
        });
      
      }
    })

    input.tags.forEach(function (tag, index) {

      if (!curSelected.includes(tag)){  // if this new tag is not already a tag, insert it
        
        connection.query('INSERT INTO linkTag (link, tag) VALUES (?, (SELECT tagId FROM tags WHERE name = ?));', [input.linkId, tag],  (err, result) => {
          if (err) {
            console.log(err);
            callback({"status":"error"});
            throw err;
          }
        });
        
      }
    })


    callback({"status":"success"});
  });
}

function deleteLink (input, callback) {


  // delete the relation in the linkTag table
  connection.query('DELETE FROM linkTag WHERE link = ?;', [input.linkId],  (err, result) => {
    if (err) {
      callback({"status":"error"});
      throw err;
    }
  });

  // delete the link itself
  connection.query('DELETE FROM links WHERE linkId = ?;', [input.linkId],  (err, result) => {
      if (err) {
        callback({"status":"error"});
        throw err;
      }
      callback({"status":"success"});
  });
}


function displayLinks(input, callback){

  // first handle tags
  // then handle search
  // last handle sort

  var sub = [];

  var q = "SELECT * FROM links ";
  
  // handle tags
    input.tags.forEach(function (tag, index) {


      q += `
        INNER JOIN linkTag lt` + index + ` ON links.linkId = lt` + index + `.link 
        INNER JOIN tags t` + index + ` ON t` + index + `.tagId = lt` + index + `.tag
        AND t` + index + `.name = ?
      `
      sub.push(tag);
    });
    
 
  // handle search
  if (input.searchTerm != ""){

    q +=  " WHERE title LIKE ? OR detail LIKE ?";
    
    sub.push('%'+input.searchTerm+'%');
    sub.push('%'+input.searchTerm+'%');
  }
  
  // handle sort
  if (input.sortby != null){
    
    if (input.sortby === "star" || input.sortby === "completed"){
      input.order = !input.order;
    }

    var order = input.order? "ASC" : "DESC";

    q += " ORDER BY " + input.sortby + " " + order;
  }


  var query = connection.query(q, sub, (err, result) => {
      if (err) throw err;
      callback(result);
  });
  
  //console.log(query.sql);
  
}

function getLinksCount(callback){
  
  connection.query('SELECT COUNT(*) as count FROM links;',  (err, result) => {
      if (err) throw err;
      callback(result);
  });
  
}

function checkExist(input, callback){

  var query = connection.query('SELECT COUNT(*) as count FROM links WHERE url=?', [input], (err, result) => {
      if (err) throw err;
      callback(result[0]);
  });

}


// both star and read are checkbox and use this function
function checkbox(input){

  connection.query('UPDATE links SET ?? = ? WHERE linkId = ?;', [input.field, input.status, input.linkId], (err, result) => {
      if (err) throw err;
  });
}


function displayTags(input, callback){

  var query = connection.query('SELECT * FROM tags ORDER BY name;', (err, result) => {
      if (err) throw err;
      callback(result);
  });

}

function getSelectedTags(input, callback){

  
var q =   " SELECT name from  \
            tags INNER JOIN linkTag on linkTag.tag = tags.tagId  \
            WHERE link = ?;"

  var query = connection.query(q, [input.linkId], (err, result) => {
    if (err) throw err;

    var selectedTags = [];

    result.forEach(function (item, index) {
      selectedTags.push(item.name);
    });

    callback(selectedTags);
  });

}


module.exports.checkExist = checkExist;
module.exports.deleteLink = deleteLink;
module.exports.insertLink = insertLink;
module.exports.displayLinks = displayLinks;
module.exports.getLinksCount = getLinksCount;
module.exports.checkbox = checkbox;
module.exports.updateLink = updateLink;
module.exports.displayTags = displayTags;
module.exports.getSelectedTags = getSelectedTags;