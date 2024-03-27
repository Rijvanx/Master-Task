const mysql = require("mysql2");

const con = mysql.createConnection({
    host     : 'localhost',
    user     : 'root',
    password : 'Dev@123',
    database : 'test'
  });

  con.connect((err)=>{
    if (err) {
        console.error('error connecting: ' + err.stack);
        return;
      }
     
      console.log('connected as id ' + con.threadId);
  });


  module.exports = con;