// const { log } = require("console");
const con = require("../../Databases/config");

const finddel = (str,i,dell) =>{
        let nextdell = 0;

    if(str[i] == dell){
        for(let j=i+1; j<str.length; j++){
            if(str[j] == '-' || str[j] == '_' || str[j] == '^' || str[j] == '$' || str[j] == '}' || str[j] == ':' || str[j] == '{'){
                nextdell = j;
                break;
            }
            nextdell = j+1;
        }
    }
    const arr = str.slice(i+1,nextdell);
    // console.log(arr);
    return arr;
}

const strconcate = (arr,name) =>{
    let sub_str;
    let str = "";
    for(let r=0; r<arr.length; r++){
        sub_str = `${name} like '` + arr[r] + "%'";
        if(arr.length == r+1){
            str = str + sub_str + " ";
        } else {
            str = str + sub_str + " or ";
        }
    }
    return "(" + str + ")";
}

exports.gridFilter = (req,res) => {
        var exp;
        var sql = "select * from student_master";
        var s_id = [];
        var first_name = [];
        var last_name = [];
        var email = [];
        var gender = [];
        var city = [];
        var cgpa = [];

        if(req.body.exp){ 
             exp = req.body.exp;
             exp = exp.split(" ").join("");
             for (let i = 0; i < exp.length; i++) {
                if(exp[i] == "-"){
                    s_id.push(finddel(exp,i, "-"));
                } else if(exp[i] == "_"){
                    first_name.push(finddel(exp,i, "_"));
                } else if(exp[i] == "^"){
                    last_name.push(finddel(exp,i, "^"));
                } else if(exp[i] == "$"){
                    email.push(finddel(exp,i, "$"));
                } else if(exp[i] == "}"){
                    gender.push(finddel(exp,i, "}"));
                } else if(exp[i] == ":"){
                    city.push(finddel(exp,i, ":"));
                } else if(exp[i] == "{"){
                    cgpa.push(finddel(exp,i, "{"));
                }
            }

            // new logic 

            // exp = exp.split(""); 
            // exp = splitString.reverse();
            // exp = reverseArray.join("");


        var finalstr = "";      
       
        if(s_id.length !=0){
           finalstr = finalstr + `s_id IN (${s_id.toString()})`;
           if(first_name.length !=0 || last_name.length !=0 || email.length !=0 || gender.length !=0 || city.length !=0 || cgpa.length !=0){
               finalstr = finalstr + "and ";
           }
        }
        if(first_name.length !=0){
            finalstr = finalstr + strconcate(first_name, "first_name");
            if(last_name.length !=0 || email.length !=0 || gender.length !=0 || city.length !=0 || cgpa.length !=0){
                finalstr = finalstr + "and ";
            }
         }
         if(last_name.length !=0){
            finalstr = finalstr + strconcate(last_name, "last_name");
            if(email.length !=0 || gender.length !=0 || city.length !=0 || cgpa.length !=0){
                finalstr = finalstr + "and ";
            }
         }
         if(email.length !=0){
            finalstr = finalstr + strconcate(email, "email");
            if(gender.length !=0 || city.length !=0 || cgpa.length !=0){
                finalstr = finalstr + "and ";
            }
         }
         if(gender.length !=0){
            finalstr = finalstr + strconcate(gender, "gender");
            if(city.length !=0 || cgpa.length !=0){
                finalstr = finalstr + "and ";
            }
         }
         if(city.length !=0){
            finalstr = finalstr + strconcate(city, "city");
            if(cgpa.length !=0){
                finalstr = finalstr + "and ";
            }
         }
         if(cgpa.length !=0){
            finalstr = finalstr + strconcate(cgpa, "current_cgpa");
         }

         sql = `select * from student_master where ${finalstr}`;
        } 
        
        // console.log(finalstr);

        //  console.log(sql);
        con.query(sql, (err, rows,fields) => {
            if (!err) {
                if(rows.length > 0){
                    res.render("pages/delimiterTask/delimiterTask", {
                        sql : sql,
                        data : rows,
                        fields : fields,
                        finalstr : finalstr,
                        exp : exp,
                        datashow : true,
                    });       
                } else {
                    res.render("pages/delimiterTask/delimiterTask", {
                        sql : sql,
                        datashow : false,
                        err : "No records Founds"
                    });
                }
            } else {
                res.render("pages/delimiterTask/delimiterTask", {
                    sql : sql,
                    datashow : false,
                    err : err
                });
            }
        })
}

