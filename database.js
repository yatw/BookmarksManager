const mysql = require('mysql');
const moment = require('moment');

// To connect to mysql
//https://stackoverflow.com/questions/50093144/mysql-8-0-client-does-not-support-authentication-protocol-requested-by-server
// run in mysql
//ALTER USER 'root'@'localhost' IDENTIFIED WITH mysql_native_password BY 'smooth';
var db = mysql.createConnection({
  host     : 'localhost',
  user     : 'root',
  password: 'smooth'
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

  let sql = 'USE infoCluster';

  let query = db.query(sql,  (err, result) => {
      if (err) throw err;
   }); 
}

function insert (input) {
    usedatabase();
    console.log("went in");

    input['createdDate'] = moment(Date.now()).format('YYYY-MM-DD');
    input['dueDate'] = moment(Date.now()).format('YYYY-MM-DD');
    input['star'] = false;

    let sql = 'INSERT INTO links SET ?';

    let query = db.query(sql, input,  (err, result) => {
        if (err) throw err;
        console.log(result);
    });
  
}

module.exports.insert = insert;

