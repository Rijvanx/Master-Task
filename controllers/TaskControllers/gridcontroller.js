var numPerRecord = 10;
var totalRecords;

const con = require("../../Databases/config");

exports.grid = (req,res) =>{
    var checkquery;
    if(req.body.sql_query){                                                   //check query pass on post method body or form
        checkquery = req.body.sql_query.toLowerCase();
    } else if(req.query.squery) {                                             //else check query pass on url get method 
        checkquery = req.query.squery.toString().toLowerCase();
    } else {
        res.render("pages/GridTask/grid", {                                            // query not in url or body then sent enter a query
            sql : checkquery,
            datashow : false,
            err : "Please Enter query"
        });
    }
    var sql;
    var datashow = true;
    // check query is drop or harmfull or not
    try{
        if(checkquery.includes("drop") || checkquery.includes("update") || checkquery.includes("insert into") || checkquery.includes("truncate") || checkquery.includes("delete") || checkquery.includes("alter")){

            res.render("pages/GridTask/grid", {
                sql : checkquery,
                datashow : false,
                err : "Query Not Run !, Only Select Querys work"
            });

    } else {

        sql = checkquery;
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

                    let fields=  Object.keys(rows[0]);
                    let sql2 = sql.replace(";","") +   ` limit ${start},${numPerRecord}`;

                    con.query(sql2,(err2,rows2) =>{
                        if(!err2){
                            res.render("pages/GridTask/grid", {
                                sql : sql,
                                data : rows2,
                                fields : fields,
                                lastpage : lastpage,
                                pagenum : pagenum,
                                datashow : datashow
                            });
                        }else{
                        console.log("error in fetch data sql2",err2)
                        }
                    })
                } else {
                    res.render("pages/GridTask/grid", {
                        sql : sql,
                        datashow : false,
                        err : "No records Founds"
                    });
                }
            } else {
                console.log("error in fetch data sql",err)
                datashow = false;
                res.render("pages/GridTask/grid", {
                    sql : sql,
                    datashow : false,
                    err : err
                });
            }
        })
    }
    }
    catch(e){
        // console.log(e);
    }
    
}
