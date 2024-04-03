const common = require("../../common/function");

exports.fetchAllStudents = async (req,res) => {
    const query = "select id,first_name,designation,mobile_number,gender,dob from basic_details";
    const data = await common.RunQuery(query,[])
    res.send(data);
}