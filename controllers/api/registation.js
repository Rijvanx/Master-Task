/* *****************************************************************************************************************
                                                  All POST Reqvests
****************************************************************************************************************** */

const common = require("../../common/function");
const jwt = require('jsonwebtoken');
require('dotenv').config();

exports.InsertRegistation = async (req, res) => {
    const obj = {
        first_name: (req.body.first_name) ? req.body.first_name : '',
        last_name: (req.body.last_name) ? req.body.last_name : '',
        dob: (req.body.dob) ? req.body.dob : '',
        email: (req.body.email) ? req.body.email : '',
        mobile_number: (req.body.mobile_number) ? req.body.mobile_number : '',
        gender: (req.body.gender) ? req.body.gender : '',
    }

    var response;
    try {

        // check email alredy exist if exist then get is_active to check user has alredy account activeor not
        const select = "SELECT stu.id as id,stu.email,stu.is_active,act.code as code FROM student_login as stu left join activation as act on stu.id=act.stu_id where stu.email = ?";
        var result = await common.RunQuery(select, [obj.email]);

        if (result.length > 0) {

            if (result[0].is_active == 1) {
                response = [{
                    status: "400",
                    msg: "You are Alredy Register !",
                }];
            } else if (result[0].is_active == 0) {
                const code = common.generateString(20);
                const activation_query = "UPDATE activation SET code = ? WHERE (stu_id = ?)";
                const activation = await common.RunQuery(activation_query, [code, result[0].id]);
                response = [{
                    status: "400",
                    msg: "Email Alredy Register !",
                    id: id,
                    activation_code: code
                }];
            }


        } else {
            // insert student table 
            const student_query = "INSERT INTO student_login (first_name, last_name, dob, email, mobile_number, gender, is_active, is_delete) VALUES (?,?,?,?,?,?,?,?)";
            var student = await common.RunQuery(student_query, [obj.first_name, obj.last_name, obj.dob, obj.email, obj.mobile_number, obj.gender, 0, 0]);
            var id = student.insertId;

            // insert user table 
            const user_query = "INSERT INTO user (stu_id, role, is_active, is_delete) VALUES (?,?,?,?)";
            const user = await common.RunQuery(user_query, [id, "student", 0, 0]);

            // insert activation table 
            const code = common.generateString(20);
            const activation_query = "INSERT INTO activation(stu_id, code) VALUES (?,?)";
            const activation = await common.RunQuery(activation_query, [id, code]);

            response = [{
                status: "201",
                msg: "Registration Successful",
                id: id,
                activation_code: code
            }];
        }


    }
    catch (err) {
        response = [{
            status: "400",
            msg: err,
        }];
    }
    res.send(response);

}

exports.activationapi = async (req, res) => {

    if (req.body.id) {

        const stu_id = req.body.id;
        const salt = common.generateString(4);
        const password = common.encryptstr(req.body.create_password + salt);

        try {
            // update(insert) password & active user in  user table 
            const user_query = "UPDATE user SET password = ?, salt = ?, is_active = 1 WHERE (stu_id = ?)";
            const user = await common.RunQuery(user_query, [password, salt, stu_id]);

            // active user in  user table 
            const student_query = "UPDATE student_login SET is_active = 1 WHERE (id = ?)";
            const student = await common.RunQuery(student_query, [stu_id]);

            res.send([{
                status: 200,
                msg: "User Sucessfully Active"
            }])
        }
        catch (err) {
            res.send([{
                stutus: 400,
                err: err
            }])
        }

    }

}

exports.GenerateforgotpasswordLink = async (req, res) => {
    var response;
    if (req.body.email) {
        try {
            // check email exist or not if exixt then get id of user(student table)
            const email_query = "SELECT id FROM student_login where email=? AND is_active = 1";
            const email = await common.RunQuery(email_query, [req.body.email]);
            if (email.length > 0) {
                const id = email[0].id;
                const code = common.generateString(20);
                const activation_query = "UPDATE activation SET code = ? WHERE (stu_id = ?)";
                const activation = await common.RunQuery(activation_query, [code, id]);

                response = {
                    status: 200,
                    msg: "code genereted",
                    code: code
                };

            } else {
                response = {
                    status: 400,
                    msg: "User Not Found",
                };
            }
        } catch (error) {
            response = {
                status: 400,
                msg: error,
            };
            console.log(error);
        }
    } else {
        response = {
            status: 400,
            msg: "Bad Requst, Email Not Found"
        };
    }

    res.send(response)
}

exports.createNewPassword = async (req, res) => {
    var response;
    if (req.body.id) {

        const stu_id = req.body.id;
        try {
            // update(insert) password & active user in  user table 
            const salt_query = "SELECT salt FROM user where stu_id= ?";
            const salt_result = await common.RunQuery(salt_query, [stu_id]);

            const password = common.encryptstr(req.body.create_password + salt_result[0].salt);

            const user_query = "UPDATE user SET password = ? WHERE (stu_id = ?)";
            const user = await common.RunQuery(user_query, [password, stu_id]);

            response = {
                status: 200,
                msg: "Password Reset successfully"
            };
        }
        catch (err) {
            response = {
                stutus: 400,
                msg: err
            }
        }

    } else {
        response = {
            stutus: 400,
            msg: "Id not Found"
        }
    }
    res.send(response);
}

exports.login = async (req, res) => {
    var response;
    if (req.body.email && req.body.password) {

        try {
            // get selt and check email is exist or not
            const get_selt_query = "SELECT stu.id,user.salt FROM student_login as stu join user on stu.id = user.stu_id where email = ?";
            const get_selt = await common.RunQuery(get_selt_query, [req.body.email]);

            if (get_selt.length > 0) {
                const password = common.encryptstr(req.body.password + get_selt[0].salt);
                const check_password_query = "SELECT stu.id,stu.first_name FROM student_login as stu JOIN user on stu.id = user.stu_id where email =? AND password = ?";
                const check_password = await common.RunQuery(check_password_query, [req.body.email, password]);
                
                if (check_password.length > 0) {
                    
                    const key = process.env.SECRET_KEY;
                    const token = jwt.sign(check_password[0], key,{
                        expiresIn: '5m'
                    });
                    res.cookie('token', token,{maxAge : 5*60*1000});
                    response = {
                        status: 200,
                        msg: "success",
                        token : token
                    }
                } else {
                    response = {
                        status: 400,
                        msg: "Invalid Email or password"
                    }
                }

            } else {
                response = {
                    status: 400,
                    msg: "Invalid Email or password"
                }
            }
        }
        catch(err){
            response = {
                status: 400,
                msg: err
            }
        }

    } else {
        response = {
            status: 400,
            msg: "Data not get"
        }
    }
    res.status(200).send(response);
}

exports.checklogin = async (req ,res) =>{
    var response;
    if(req.cookies.token){
        const token = req.cookies.token;
        
        try{
            const key = process.env.SECRET_KEY;
            let decoded = jwt.verify(token, key);
            const query = "SELECT email,first_name FROM student_login where id = ?";
            const result = await common.RunQuery(query, [decoded.id]);
            response = {
                status : 200,
                msg : "Logged",
                data : result[0]
            }
        }
        catch(e){
            response = {
                status : 400,
                msg : e,
            }
        }
    } else{
        response = {
            status : 400,
            msg : "token not found",
        }
    }
    
    res.send(response)
}


