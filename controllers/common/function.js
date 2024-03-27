const con = require("../../Databases/config");
const md5 = require('md5');

function RunQuery(query, params) {
    return new Promise((resolve, reject) => {
        con.query(query, params, (err, results) => {
  
          if (err) {  
            return reject(err);
          }
  
          return resolve(results);
          
        });
    });
}

function generateString(length) {
    const characters ='ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
    let result = ' ';
    const charactersLength = characters.length;
    for ( let i = 0; i < length; i++ ) {
        result += characters.charAt(Math.floor(Math.random() * charactersLength));
    }
    return result.trim();
}

function encryptstr(str){
  return md5(str);
}

// const bd_query = "select *,DATE_FORMAT(dob,'%Y-%m-%d') as dob from basic_details where id = ?";
// const basic_details = await RunQuery(bd_query,id);

module.exports = {RunQuery,generateString,encryptstr}