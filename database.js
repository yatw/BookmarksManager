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
  connection.query('CALL insertLink(?,?,?);', [input.title, input.url, input.detail],  (err, result) => {
      if (err) {
        console.log(err);
        callback({"status":"error"});
        throw err;
      }

      let insertedId = result[0][0].linkId;
      
      // for each tag, insert the relation into the linkTag table
      input.tags.forEach(function (tag, index) {

        // cannot use url, use url to get id
        connection.query('CALL insertLinkTagRelation(?,?);', [insertedId, tag],  (err) => {
          if (err) {
            console.log(err);
            callback({"status":"error"});
            throw err;
          }
        });

      });
  });

 
  callback({"status":"success"});
}

function updateLink (input, callback) {

  // update information associated with the link
  connection.query('CALL updateLink(?,?,?,?);', [input.url, input.title, input.detail, input.linkId],  (err, result) => {
      if (err) {
        callback({"status":"error"});
        throw err;
      }
  });
  
  // update the corresponding link tag relation

  // get this link's current selected tags
  connection.query("CALL getSelectedTags(?);", [input.linkId],  (err, result) => {
    if (err) {
      callback({"status":"error"});
      throw err;
    }

    let prevSelected = result[0].map((r)=> r.name);
    
    var curSelected = new Set(); 

    // iterate through prevSelected, which is the tags before this update
    prevSelected.forEach(function (tag, index) {
      
      // if it is already in input, it is already selected, no need to do anything
      if (input.tags.includes(tag)){
        curSelected.add(tag);

      }else{
        // otherwise, if this tag is now not needed, remove

        connection.query('CALL deleteLinkTagRelation(?,?);', [input.linkId, tag],  (err, result) => {
          if (err) {
            console.log(err);
            callback({"status":"error"});
            throw err;
          }
        });
      }
    })

    // iterate through input, if it is not already in curSelected, insert it
    input.tags.forEach(function (tag, index) {

      if (!curSelected.has(tag)){  // if this new tag is not already a tag, insert it
      
        connection.query('CALL insertLinkTagRelation(?,?);', [input.linkId, tag],  (err, result) => {
          if (err) {
            console.log(err);
            callback({"status":"error"});
            throw err;
          }
        });
         
        curSelected.add(tag);
      }
    })


    callback({"status":"success"});
  });
}

function deleteLink (input, callback) {


  connection.query('CALL deleteLink(?);', [input.linkId],  (err, result) => {
    if (err) {
      callback({"status":"error"});
      throw err;
    }
  });
  callback({"status":"success"});

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
  
  connection.query('CALL getLinksCount();',  (err, result) => {
      if (err) throw err;
      callback(result[0]);
  });
  
}

function checkExist(input, callback){

  var query = connection.query('CALL checkExist(?);', [input], (err, result) => {
      if (err) throw err;

      callback(result[0][0]);
  });

}


// both star and read are checkbox and use this function
function checkbox(input){

  connection.query('CALL checkbox(?,?,?);', [input.field, input.status, input.linkId], (err, result) => {
      if (err) throw err;
  });
}


function displayTags(input, callback){

  var query = connection.query('CALL displayTags();', (err, result) => {
      if (err) throw err;
      callback(result[0]);
  });

}

function getSelectedTags(input, callback){

  
  var query = connection.query('CALL getSelectedTags(?);', [input.linkId], (err, result) => {
    if (err) throw err;

    var selectedTags = [];

    result[0].forEach(function (item, index) {
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