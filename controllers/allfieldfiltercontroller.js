const con = require("../Databases/config");

var numPerRecord = 10;
var totalRecords;

exports.gridFilter = (req,res) => {
    var filterdata = {};
    // console.log(req.body);
    var sql;
    if(req.body.ids){ 
        let ids = req.body.ids;                                                  //check query pass on post method body or form
        sql = `select * from student where s_id IN (${ids})`;
        filterdata = { 
            "id" :  req.body.ids,
            "first": null,
            "last": null,
            "email": null,
            "gender": null,
            "city": null,
            "country": null,
            "cgpa": null
         };
    } else if(req.query.query){
        sql = req.query.query;
    } else if(req.body.first || req.body.last || req.body.email || req.body.gender || req.body.city || req.body.country || req.body.cgpa){
        filterdata = {"id" : null , ...req.body}
        var cg_op;
        console.log(req.body.cgpa);
        if(req.body.cgpa == 0){
            cg_op = "< 5 ";
        } if(req.body.cgpa == 1){
            cg_op = "> 5 ";
        } else {
            cg_op = "> 0 ";
        }
        sql = `select * from student where first_name like '${req.body.first}%' AND last_name like '${req.body.last}%' AND email like '${req.body.email}%' AND gender like '${req.body.gender}%' AND city like '${req.body.city}%' AND country like '${req.body.country}%' AND current_cgpa ${cg_op}`; 
    } else {
        sql = "select * from student";
    }

    // url decode
    sql = sql.replace(/%20/g, ' ');
    sql = sql.replace(/%27/g, "'");
    sql = sql.replace(/%3E/g, '>');
    sql = sql.replace(/%3C/g, '<');

    let pagenum = req.query.n;
    if (!req.query.n || req.query.n < 1) {
        pagenum = 1;
    }             
    var n = pagenum - 1;
    console.log(sql);
    con.query(sql, async (err, rows) => {
        if (!err) {
            totalRecords = rows.length;
            let start = numPerRecord * n;
            let lastpage = Math.ceil(totalRecords / numPerRecord);
            if(rows.length > 0){

                let sql2 = sql.replace(";" , "") +   ` limit ${start},${numPerRecord}`;
                // console.log(sql2);
                con.query(sql2,(err2,result,fields) =>{
                    if(!err2){
                        res.render("pages/allfieldFilter/task04march", {
                            sql : sql,
                            data : result,
                            fields : fields,
                            lastpage : lastpage,
                            pagenum : pagenum,
                            filterdata : filterdata,
                            datashow : true,
                        });
                    }else{
                    console.log("error in fetch data sql2",err2)
                    }
                })

            } else {
                res.render("pages/allfieldFilter/task04march", {
                    sql : sql,
                    datashow : false,
                    filterdata : filterdata,
                    err : "No records Founds"
                });
            }
        } else {
            console.log("error in fetch data sql",err)
            res.render("pages/allfieldFilter/task04march", {
                sql : sql,
                datashow : false,
                err : err,
                filterdata : filterdata
            });
        }
    })

}

exports.task = (req,res) =>{
    var sql;
 
    var orderby,order;

    if(req.query.orderby){
        orderby = req.query.orderby;
    } else {
        orderby = "s_id";
    }

    if(req.query.order){
        order = req.query.order;
    } else {
        order = "ASC";
    }

    var year,month,last_date;;
    if(req.query.year){
        year = req.query.year;
    } else {
        year = "2000";
    }

    if(req.query.month){
        month = req.query.month;
    } else {
        month = "01";
    }

    if(req.query.date){
        last_date = req.query.date;
    } else {
        last_date = "28";
    }
    var d = new Date(2008, month, 0);
    console.log(d.toString()); //
    
    sql = `select * from student WHERE (dob BETWEEN '${year}-${month}-01' AND '${year}-${month}-${last_date}')`;
        
        let pagenum = req.query.n;
        if (!req.query.n || req.query.n < 1) {
            pagenum = 1;
        }             
        var n = pagenum - 1;
        con.query(sql, (err, rows) => {
            if (!err) {
                totalRecords = rows.length;
                let start = numPerRecord * n;
                let lastpage = Math.ceil(totalRecords / numPerRecord);
                // console.log(rows);
                if(rows.length > 0){

                    // let fields=  Object.keys(rows[0]);
                    let sql2 = sql.replace(";" , "") +  ` order by ${orderby} ${order} limit ${start},${numPerRecord}`;
                    // console.log(sql2);

                    con.query(sql2,(err2,result,fields) =>{
                        if(!err2){
                            // console.log(fields);
                            res.render("pages/allfieldFilter/task01march", {
                                sql : sql,
                                data : result,
                                fields : fields,
                                lastpage : lastpage,
                                pagenum : pagenum,
                                order : order,
                                orderby : orderby,
                                year : year,
                                month : month,
                                datashow : true,
                            });
                        }else{
                        console.log("error in fetch data sql2",err2)
                        }
                    })
                } else {
                    res.render("pages/allfieldFilter/task01march", {
                        sql : sql,
                        datashow : false,
                        err : "No records Founds"
                    });
                }
            } else {
                console.log("error in fetch data sql",err)
                datashow = false;
                res.render("pages/allfieldFilter/task01march", {
                    sql : sql,
                    datashow : false,
                    err : err
                });
            }
        })
    // }
}