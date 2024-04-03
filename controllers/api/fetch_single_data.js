
const common = require( "../../common/function");

exports.fetch_single_data = async (req,res) =>{
    const id = req.query.id || "0";
    try{

        const bd_query = "select *,DATE_FORMAT(dob,'%Y-%m-%d') as dob from basic_details where id = ?";
        const basic_details = await common.RunQuery(bd_query,id);
  
        const edu_query = "SELECT * FROM education_details where emp_id = ?";
        const edu_details = await common.RunQuery(edu_query,id);

        const exp_query = "SELECT *,DATE_FORMAT(fromdate,'%Y-%m-%d') as fromdate,DATE_FORMAT(to_date,'%Y-%m-%d') as to_date FROM work_exp where emp_id = ?";
        const exp_details = await common.RunQuery(exp_query,id);

        const lang_query = "SELECT lan_name,GROUP_CONCAT(distinct lag_level SEPARATOR ',') as lag_level FROM language_know where emp_id = ? group by lan_name";
        const rows = await common.RunQuery(lang_query,id);
        let lang_details ={};
        rows.forEach(element => {
            if(element.lan_name == "hindi"){
                lang_details.hindi = element.lag_level.split(",");
            } else if(element.lan_name == "english"){
                lang_details.english = element.lag_level.split(",");
            } else if(element.lan_name == "gujarati"){
                lang_details.gujarati = element.lag_level.split(",");
            }
        });

        const tech_query = "SELECT * FROM technologies_know where emp_id = ?";
        let techdetails = await common.RunQuery(tech_query,id);
        let tech_details ={};
        techdetails.forEach(element => {
            if(element.tech_name == 'php'){
                tech_details.php = element.tech_level;
            } 
            if(element.tech_name == 'mysql'){
                tech_details.mysql = element.tech_level;
            }
            if(element.tech_name == 'laravel'){
                tech_details.laravel = element.tech_level;
            }
            if(element.tech_name == 'oracle'){
                tech_details.oracle = element.tech_level;
            }
        });
        // tech_details = {}
        
        const refer_query = "SELECT * FROM referance_contact where emp_id = ?";
        const refer_details = await common.RunQuery(refer_query,id);

        const preferances_query = "SELECT * FROM preferances where emp_id = ?";
        const preferances_details = await common.RunQuery(preferances_query,id);

        const mergedJSON = { basic_details , edu_details, exp_details, lang_details, tech_details, refer_details, preferances_details};

        res.send(mergedJSON); 

    } catch(err){
        res.send(err)
    }
}