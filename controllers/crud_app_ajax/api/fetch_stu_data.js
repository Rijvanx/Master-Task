const con = require("../../../Databases/config");

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


exports.fetchAllStudents = async (req,res) => {
    const query = "select id,first_name,designation,mobile_number,gender,dob from basic_details";
    const data = await RunQuery(query,[])
    res.send(data);
}