const con = require("../../Databases/config");


exports.updateAllData = (req,res) =>{
    if(req.body.emp_id){
        const obj = {
            // basic details
            id : (req.body.emp_id) ? req.body.emp_id : 0,
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
            // education details
            university: (req.body.university) ? req.body.university.filter(e => e) : [],
            year: (req.body.year) ? req.body.year.filter(e => e) : [],
            percentage: (req.body.percentage) ? req.body.percentage.filter(e => e) : [],
            course: (req.body.course) ? req.body.course.filter(e => e) : [],
            // exp details
            company_name: (req.body.company_name) ? req.body.company_name.filter(e => e) : [],
            fromdate: (req.body.fromdate) ? req.body.fromdate.filter(e => e) : [],
            todate: (req.body.todate) ? req.body.todate.filter(e => e) : [],
            designationc: (req.body.designationc) ? req.body.designationc.filter(e => e) : [],
            // language details
            language : (req.body.language) ? req.body.language.filter(e => e) : [],
            hindi_level: (req.body.hindi_level) ? req.body.hindi_level.filter(e => e) : [],
            english_level: (req.body.english_level) ? req.body.english_level.filter(e => e) : [],
            gujarati_level: (req.body.gujarati_level) ? req.body.gujarati_level.filter(e => e) : [],
            // technologies details
            technologies : (req.body.technologies) ? req.body.technologies.filter(e => e) : [],
            php_level: (req.body.php_level) ? req.body.php_level : '',
            mysql_level: (req.body.mysql_level) ? req.body.mysql_level : '',
            laravel_level: (req.body.laravel_level) ? req.body.laravel_level : '',
            oracle_level: (req.body.oracle_level) ? req.body.oracle_level : '',
            //referance_contact details
            referance_name: (req.body.referance_name) ? req.body.referance_name.filter(e => e) : [],
            referance_contact_number: (req.body.referance_contact_number) ? req.body.referance_contact_number.filter(e => e) : [],
            referance_relation: (req.body.referance_relation) ? req.body.referance_relation.filter(e => e) : [],
            //preferances details 
            preferd_location: (req.body.preferd_location) ? req.body.preferd_location : '',
            notice_period: (req.body.notice_period) ? req.body.notice_period : '',
            department: (req.body.department) ? req.body.department : '',
            expacted_ctc: (req.body.expacted_ctc) ? req.body.expacted_ctc : '',
            current_ctc: (req.body.current_ctc) ? req.body.current_ctc : ''
        }

        // update basic_details 

        const bd = "UPDATE basic_details SET first_name = ?, last_name = ?, designation = ?, email = ?, address1 = ?, address2 = ?, mobile_number = ?, state = ?, city = ?, zip_code = ?, gender = ?, relationship_status = ?, dob = ? WHERE (id = ?)";
        con.query(bd, [obj.first_name,obj.last_name,obj.designation,obj.email,obj.address1,obj.address2,obj.mobile_number,obj.state,obj.city,obj.zip_code,obj.gender,obj.relationship_status,obj.dob,obj.id], (err2, rows2) => {
            if (err2) {
                console.log("error in basic : " + err);
            }
        })

        // education table insert
        const del1 = "DELETE FROM education_details WHERE emp_id = ?";
        con.query(del1, [obj.id], (err2, rows2) => {
            if (err2) {
                console.log("error in education : " + err);
            }
        })

        if (obj.university.length != 0) {
            for (let i = 0; i < obj.university.length; i++) {
                let education = "INSERT INTO education_details (emp_id, course, university, passing_year, percentage) VALUES (?, ?, ?, ?, ?)";
                con.query(education, [obj.id, obj.course[i], obj.university[i], obj.year[i], obj.percentage[i]], (err2, rows2) => {
                    if (err2) {
                        console.log("error in education : " + err);
                    }
                })
            }
        }

        // // exp table insert
        const del2 = "DELETE FROM work_exp WHERE emp_id = ?";
        con.query(del2, [obj.id], (err2, rows2) => {
            if (err2) {
                console.log("error in  : " + err);
            }
        })
        if (obj.company_name.length != 0) {
            let work_exp = "INSERT INTO work_exp (emp_id, company_name, designation, fromdate, to_date) VALUES (?, ?, ?, ?, ?)";
            for (let i = 0; i < obj.company_name.length; i++) {
                con.query(work_exp, [obj.id, obj.company_name[i], obj.designationc[i], obj.fromdate[i], obj.todate[i]], (err3, rows3) => {
                    if (err3) console.log(err3);
                });
            }
        }

        // language table insert
        const del3 = "DELETE FROM language_know WHERE emp_id = ?";
        con.query(del3, [obj.id], (err2, rows2) => {
            if (err2) {
                console.log("error in  : " + err);
            }
        })
        let lang_know = "INSERT INTO language_know(emp_id, lan_name,lag_level) VALUES (?, ?, ?)";
        obj.language.forEach(element => {
            let level = eval(`obj.${element}_level`);
            level.forEach(el => {
                con.query(lang_know, [obj.id, element, el], (err4, rows4) => {
                    if (err4) console.log(err4);
                });
            });
        });
            
        // // technologies table insert technologies
        const del4 = "DELETE FROM technologies_know WHERE emp_id = ?";
        con.query(del4, [obj.id], (err2, rows2) => {
            if (err2) {
                console.log("error in  : " + err);
            }
        })
        let tech_know = "INSERT INTO technologies_know (emp_id, tech_name, tech_level) VALUES (?, ?, ?)";
        obj.technologies.forEach(element => {
            let level = eval(`obj.${element}_level`);
            con.query(tech_know, [obj.id, element, level], (err4, rows4) => {
                if (err4) console.log(err4);
            });
        });

        // // referance_contact table insert
        const del5 = "DELETE FROM referance_contact WHERE emp_id = ?";
        con.query(del5, [obj.id], (err2, rows2) => {
            if (err2) {
                console.log("error in  : " + err);
            }
        })
        if (obj.referance_name.length != 0) {
            for (let i = 0; i < obj.referance_name.length; i++) {
                let referance_contact = "INSERT INTO referance_contact (emp_id, name, contact_number, relation) VALUES (?, ?, ?, ?)";
                con.query(referance_contact, [obj.id, obj.referance_name[i], obj.referance_contact_number[i], obj.referance_relation[i]], (err3, rows3) => {
                    if (err3) console.log(err3);
                });
            }
        }

        // //preferances insert 
        const del6 = "DELETE FROM preferances WHERE emp_id = ?";
        con.query(del6, [obj.id], (err2, rows2) => {
            if (err2) {
                console.log("error in  : " + err);
            }
        })
        let preferances = "INSERT INTO preferances (emp_id, preferd_location, notice_period, expacted_ctc, current_ctc,department) VALUES (?,?,?,?,?,?)";
        con.query(preferances, [obj.id, obj.preferd_location, obj.notice_period, obj.expacted_ctc, obj.current_ctc, obj.department], (err4, rows4) => {
            if (err4) console.log(err4);
        });
    
        res.send([{
            msg : "data sucessfully updated"
        }])

    } else {
        res.send([{
            err : "invalid Reqvest"
       }])
    }
}