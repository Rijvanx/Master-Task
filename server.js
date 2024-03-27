const express = require("express");
const useRouter = require('./router.js');
const cookieParser = require('cookie-parser');

const app = express();
app.use(express.json())
app.use(express.urlencoded({ extended: true }));
// app.use(bodyparser.json());


app.use(cookieParser());
app.set('view engine', 'ejs');
app.use(express.static("public"));
app.use("/",useRouter);  



app.listen("3000", (err)=>{
    if(err){
        console.log("connection error");
    }else{
        console.log("server is listing at 3000");
    }
})


