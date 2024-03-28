const con = require("../../../../Databases/config");

const validation = (obj) => {
    return { status: "success" };   
}

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


exports.insertBasicData = async (req, res) => {
    
    if (req.method == "POST") {
        console.log("post Data",req.body);
        
        const run = validation("obj");
  
        if (run.status == "success") {
            try{
                // Insert Basic Details 
                const obj = {
                    first_name: (req.body.first_name) ? req.body.first_name : '',
                    last_name: (req.body.last_name) ? req.body.last_name : '',
                    designation: (req.body.designation) ? req.body.designation : '',
                    email: (req.body.email) ? req.body.email : '',
                    address1: (req.body.address1) ? req.body.address1 : '',
                    address2: (req.body.address2) ? req.body.address2 : '',
                    mobile_number: (req.body.mobile_number) ? req.body.mobile_number : '',
                    state: (req.body.state) ? req.body.state : '',
                    city: (req.body.city) ? req.body.city : '',
                    zip_code: (req.body.zip_code) ? req.body.zip_code : '',
                    gender: (req.body.gender) ? req.body.gender : '',
                    relationship_status: (req.body.relationship_status) ? req.body.relationship_status : '',
                    dob: (req.body.dob) ? req.body.dob : '',
                }
                const basic_detail = "INSERT INTO basic_details(first_name, last_name, designation, email, address1, address2, mobile_number, state, city, zip_code, gender, relationship_status, dob) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)"
                const data = await RunQuery(basic_detail, [obj.first_name, obj.last_name, obj.designation, obj.email, obj.address1, obj.address2, obj.mobile_number, obj.state, obj.city, obj.zip_code, obj.gender, obj.relationship_status, obj.dob]); 

                // basic Detail Inserted Id
                const inserted_id = data.insertId; 

                //  ======== education table insert ==========//
                const edu_obj ={
                    // education details
                    university: (req.body.university) ? req.body.university.filter(e => e) : [],
                    year: (req.body.year) ? req.body.year.filter(e => e) : [],
                    percentage: (req.body.percentage) ? req.body.percentage.filter(e => e) : [],
                    course: (req.body.course) ? req.body.course.filter(e => e) : []
                }
                const edu_query = "INSERT INTO education_details (emp_id, course, university, passing_year, percentage) VALUES (?, ?, ?, ?, ?)";
                if (edu_obj.university.length != 0) {
                    for (let i = 0; i < edu_obj.university.length; i++) {
                    let edu = await RunQuery(edu_query, [inserted_id, edu_obj.course[i], edu_obj.university[i], edu_obj.year[i], edu_obj.percentage[i]]);
                    }
                }

                //  ======== exp table insert ==========//
                const exp_obj ={
                    company_name: (req.body.company_name) ? req.body.company_name.filter(e => e) : [],
                    fromdate: (req.body.fromdate) ? req.body.fromdate.filter(e => e) : [],
                    todate: (req.body.todate) ? req.body.todate.filter(e => e) : [],
                    designationc: (req.body.designationc) ? req.body.designationc.filter(e => e) : []
                }
                let work_exp_query = "INSERT INTO work_exp (emp_id, company_name, designation, fromdate, to_date) VALUES (?, ?, ?, ?, ?)";
                if (exp_obj.company_name.length != 0) {
                    for (let i = 0; i < exp_obj.company_name.length; i++) {
                        let ex = await RunQuery(work_exp_query,[inserted_id, exp_obj.company_name[i], exp_obj.designationc[i], exp_obj.fromdate[i], exp_obj.todate[i]])
                    }
                }

                //  ======== language table insert ==========//
                const language_obj ={
                    language : (req.body.language) ? req.body.language.filter(e => e) : [],
                    hindi_level: (req.body.hindi_level) ? req.body.hindi_level.filter(e => e) : [],
                    english_level: (req.body.english_level) ? req.body.english_level.filter(e => e) : [],
                    gujarati_level: (req.body.gujarati_level) ? req.body.gujarati_level.filter(e => e) : []
                }
                let lang_know_query = "INSERT INTO language_know(emp_id, lan_name,lag_level) VALUES (?, ?, ?)";
                language_obj.language.forEach(element => {
                    let level = eval(`language_obj.${element}_level`);
                    level.forEach(async (el) => {
                        let lang = await RunQuery(lang_know_query,[inserted_id, element, el]);
                    });
                });

                //  ======== technologies table insert technologies ==========//
                const technologies_obj ={
                    technologies : (req.body.technologies) ? req.body.technologies.filter(e => e) : [],
                    php_level: (req.body.php_level) ? req.body.php_level : '',
                    mysql_level: (req.body.mysql_level) ? req.body.mysql_level : '',
                    laravel_level: (req.body.laravel_level) ? req.body.laravel_level : '',
                    oracle_level: (req.body.oracle_level) ? req.body.oracle_level : ''
                }
                let tech_know_query = "INSERT INTO technologies_know (emp_id, tech_name, tech_level) VALUES (?, ?, ?)";
                technologies_obj.technologies.forEach(async (element) => {
                    let level = eval(`technologies_obj.${element}_level`);
                    let tech = await RunQuery(tech_know_query,[inserted_id, element, level]);
                });
                
                //  ======== referance_contact table insert ==========//
                const referance_contact_obj ={
                    referance_name: (req.body.referance_name) ? req.body.referance_name.filter(e => e) : [],
                    referance_contact_number: (req.body.referance_contact_number) ? req.body.referance_contact_number.filter(e => e) : [],
                    referance_relation: (req.body.referance_relation) ? req.body.referance_relation.filter(e => e) : []
                }
                let referance_contact_query = "INSERT INTO referance_contact (emp_id, name, contact_number, relation) VALUES (?, ?, ?, ?)";
                if (referance_contact_obj.referance_name.length != 0) {
                    for (let i = 0; i < referance_contact_obj.referance_name.length; i++) {
                        let ref = await RunQuery(referance_contact_query,[inserted_id, referance_contact_obj.referance_name[i], referance_contact_obj.referance_contact_number[i], referance_contact_obj.referance_relation[i]]);
                    }
                }

                // ======== preferances insert  ==========//
                const preferances_contact_obj ={
                    preferd_location: (req.body.preferd_location) ? req.body.preferd_location : '',
                    notice_period: (req.body.notice_period) ? req.body.notice_period : '',
                    department: (req.body.department) ? req.body.department : '',
                    expacted_ctc: (req.body.expacted_ctc) ? req.body.expacted_ctc : '',
                    current_ctc: (req.body.current_ctc) ? req.body.current_ctc : ''
                }
                let preferances_query = "INSERT INTO preferances (emp_id, preferd_location, notice_period, expacted_ctc, current_ctc,department) VALUES (?,?,?,?,?,?)";
                let pre = await RunQuery(preferances_query,[inserted_id, preferances_contact_obj.preferd_location, preferances_contact_obj.notice_period, preferances_contact_obj.expacted_ctc, preferances_contact_obj.current_ctc, preferances_contact_obj.department])
                
                // Response Send
                res.send([{
                    status : 201,
                    err : "Created Successfully",
                    insertId : data.insertId
                }]);         

            } catch(err){
                res.send([{
                    status : 502,
                    err : err,
                    insertId : 0          
                }]);
            }
        } else {
            // console.log(run.status);
            res.send([{
                status : 400,
                err : "data not valid",
                insertId : 0
            }]);
        }
    } else {
        res.send([{
            status : 400,
            err : "not post request",
            insertId : 0
        }]);
    }
}