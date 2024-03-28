const express = require("express");
const router = express.Router();
const controller = require('./controllers/controller');
const registation = require('./controllers/api/registation');
const controllergrid =  require('./controllers/TaskControllers/gridcontroller');
const controllerdelimiter =  require('./controllers/TaskControllers/delimitercontroller');
const jsonplaccontro = require('./controllers/TaskControllers/jsonplaccontro');
const crudappcontroller = require('./controllers/TaskControllers/crudappcontroller');
const crudajax = require('./controllers/TaskControllers/crud_app_ajax/controller');
const insert = require('./controllers/TaskControllers/crud_app_ajax/api/insert');
const fetch_stu_data = require('./controllers/TaskControllers/crud_app_ajax/api/fetch_stu_data');
const fetch_single_data = require('./controllers/TaskControllers/crud_app_ajax/api/fetch_single_data');
const update = require('./controllers/TaskControllers/crud_app_ajax/api/update');
const examresult = require('./controllers/TaskControllers/examresultcontroller');


// const passport = require("passport");
// const initializingPassport = require("./controllers/passportConfig");

// initializingPassport.initializingPassport(passport);

router.get('/', controller.index);
router.get('/registation', controller.registation);
router.get('/login', controller.login);
router.get('/activation', controller.activation);
router.get('/forgotpassword', controller.forgotpassword);
router.get('/resetpassword', controller.resetpassword);

// ================= apis =====================//
router.post('/api/registation', registation.InsertRegistation);
router.post('/api/activation', registation.activationapi);
router.post('/api/GenerateforgotpasswordLink', registation.GenerateforgotpasswordLink);
router.post('/api/createNewPassword', registation.createNewPassword);
router.post('/api/login', registation.login);
router.post('/api/checklogin', registation.checklogin);


// ========================================== Dyamic Table  ========================================//

router.get('/DynamicTable/table',(req,res)=>{
    res.render('pages/Dynamic Table/addbox')
})


// ========================================== KukuCube ========================================//

router.get('/KukuCube/kukucube',(req,res)=>{
    res.render('pages/kukucube/kukucube');
})
// ========================================== jsevent ========================================//

router.get('/task/jsevent',(req,res) =>{
    res.render('pages/jsevent/eventsPrac');
})

// ========================================== TicTacToe  ========================================//

router.get('/TicTacToe/tictactoe',(req,res)=>{
    res.render('pages/TicTacToe/tictactoe')
})

// ========================================== 3 Front End Templete ========================================//

router.get('/templete/templete1',(req,res)=>{
    res.render('pages/templete/templete1')
})

router.get('/templete/templete2',(req,res)=>{
    res.render('pages/templete/templete2')
})

router.get('/templete/templete3',(req,res)=>{
    res.render('pages/templete/templete3')
})


// ========================================== grid ========================================//

router.get('/task/grid',controllergrid.grid);
router.post('/task/grid',controllergrid.grid);


// ========================================== delimite search ========================================//

router.get('/task/delimiter/filtergrid',controllerdelimiter.gridFilter);
router.post('/task/delimiter/filtergrid',controllerdelimiter.gridFilter);

// ========================================== json Placeholder task ========================================//

router.get('/jsonplaceholder/task/posts', jsonplaccontro.posts);
router.get('/jsonplaceholder/task/details', jsonplaccontro.moredetails);
router.get('/jsonplaceholder/task/comment', jsonplaccontro.comment);

// ========================================== Time zon task ========================================//

router.get('/task/timezone',(req,res)=>{
    res.render('pages/TimezonTask/timezone')
})


// ========================================= crud app task ========================================//

router.get('/task/form', crudappcontroller.form);
router.post('/task/form', crudappcontroller.form);

router.get('/notfound', (req,res)=>{
    res.render("pages/crud_app/notfound")
});

router.get('/task/edit', crudappcontroller.updateform);
router.post('/task/api/update',crudappcontroller.update);


// ========================================= crud app with AJAX task ========================================//

router.get('/stepform', crudajax.multistepfrom);

// // =========== API'S ==========// 
router.get('/api/getstate', crudajax.getstate);
router.get('/api/city', crudajax.getcity);
router.get('/students', crudajax.students);
router.post('/api/insertBasicData', insert.insertBasicData);
router.get('/api/students', fetch_stu_data.fetchAllStudents);
router.get('/api/fetch_single_data', fetch_single_data.fetch_single_data);
router.post('/api/updateAllData', update.updateAllData);

// ========================================= Exam Result task ========================================//

router.get("/getExamResult", examresult.getResult);
router.get("/getMoreInfoOfResult", examresult.getMoreInfo);


module.exports = router;