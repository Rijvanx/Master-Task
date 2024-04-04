const common = require("../common/function");
const jwt = require('jsonwebtoken');

exports.authcheck = async (req,res,next) =>{
    var token =  req.cookies.token
    if(typeof token === 'undefined'){
        res.redirect('/login');
    }else{
        const key = process.env.SECRET_KEY;
        let decoded = jwt.verify(token, key);
        const query = "SELECT email,first_name FROM student_login where id = ?";
        const result = await common.RunQuery(query, [decoded.id]);
        if(result.length > 0){
            next()
        }else{
            res.render('/login');
        }
    }
}