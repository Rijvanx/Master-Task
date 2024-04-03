
/* *****************************************************************************************************************
                                                  All Get Requests
*********************************************************************************************************************/ 

const jwt = require('jsonwebtoken');
const common = require("../common/function");

require("dotenv").config();

exports.index = (req, res) => {
    res.render('pages/index');
}

exports.registation = (req,res) =>{
    res.render('pages/registationform');
}

exports.login = (req,res) =>{
    res.render('pages/login');
}

exports.forgotpassword = (req,res) =>{
    res.render('pages/ForgotpasswordEmail');
}

// render
exports.resetpassword = async (req,res) =>{

    if(req.query.acvcode){
        const query = `select stu.id,act.updated_at from student_login as stu JOIN activation as act on stu.id = act.stu_id where stu.is_active = 1 AND act.code = '${req.query.acvcode}'`;
        const result = await common.RunQuery(query);
        if(result.length > 0){
            let diff = Math.abs(new Date() - new Date(result[0].updated_at));
            let minutes = Math.floor((diff/1000)/60);
            if(minutes < 5){
                res.render('pages/resetpassword',{
                    data : result,
                    minutes : minutes
                });
            } else {
                res.send("Link Expired! Please try again");
            }
        } else {
            res.send("bad request 400");
        }
    } else {
        res.send("bad request 400");
    }

}

// render
exports.activation =  async (req,res) =>{
    if(req.query.acvcode){
        const query = `select stu.id,act.updated_at from student_login as stu JOIN activation as act on stu.id = act.stu_id where stu.is_active = 0 AND act.code = '${req.query.acvcode}'`;
        const result = await common.RunQuery(query);
        console.log(result);
        if(result.length > 0){
            let diff = Math.abs(new Date() - new Date(result[0].updated_at));
            let minutes = Math.floor((diff/1000)/60);
            if(minutes < 1){
                res.render('pages/activeaccount',{
                    data : result,
                    minutes : minutes
                });
            }else {
                res.send("Link Expired! Please Register Again, with same email");
            }
            
        } else {
            res.send("bad request 400");
        }
    } else {
        res.send("bad request 400");
    }
}

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