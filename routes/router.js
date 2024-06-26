const express = require("express");
const router = express.Router();
const controller = require('../controllers/controller');
const registation = require('../controllers/api/registation');
const controllergrid =  require('../controllers/gridcontroller');
const controllerdelimiter =  require('../controllers/delimitercontroller');
const jsonplaccontro = require('../controllers/jsonplaccontro');
const crudappcontroller = require('../controllers/crudappcontroller');
const crudajax = require('../controllers/crudajaxcontroller');
const insert = require('../controllers/api/insert');
const fetch_stu_data = require('../controllers/api/fetch_stu_data');
const fetch_single_data = require('../controllers/api/fetch_single_data');
const update = require('../controllers/api/update');
const examresult = require('../controllers/examresultcontroller');
const fieldsfilter = require('../controllers/allfieldfiltercontroller');
const { authcheck } = require('../middleware/auth_service');

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

router.get('/DynamicTable/table',authcheck,(req,res)=>{
    res.render('pages/Dynamic Table/addbox')
})


// ========================================== KukuCube ========================================//

router.get('/KukuCube/kukucube',authcheck,(req,res)=>{
    res.render('pages/kukucube/kukucube');
})
// ========================================== jsevent ========================================//

router.get('/task/jsevent',authcheck,(req,res) =>{
    res.render('pages/jsevent/eventsPrac');
})

// ========================================== TicTacToe  ========================================//

router.get('/TicTacToe/tictactoe',authcheck,(req,res)=>{
    res.render('pages/TicTacToe/tictactoe')
})

// ========================================== 3 Front End Templete ========================================//

router.get('/templete/templete1',authcheck,(req,res)=>{
    res.render('pages/templete/templete1')
})

router.get('/templete/templete2',authcheck,(req,res)=>{
    res.render('pages/templete/templete2')
})

router.get('/templete/templete3',authcheck,(req,res)=>{
    res.render('pages/templete/templete3')
})


// ========================================== grid ========================================//

router.get('/task/grid',authcheck,controllergrid.grid);
router.post('/task/grid',controllergrid.grid);


// ========================================== delimite search ========================================//

router.get('/task/delimiter/filtergrid',authcheck,controllerdelimiter.gridFilter);
router.post('/task/delimiter/filtergrid',controllerdelimiter.gridFilter);

// ========================================== json Placeholder task ========================================//

router.get('/jsonplaceholder/task/posts',authcheck, jsonplaccontro.posts);
router.get('/jsonplaceholder/task/details',authcheck, jsonplaccontro.moredetails);
router.get('/jsonplaceholder/task/comment',authcheck, jsonplaccontro.comment);

// ========================================== Time zon task ========================================//

router.get('/task/timezone',authcheck,(req,res)=>{
    res.render('pages/TimezonTask/timezone')
})


// ========================================= crud app task ========================================//

router.get('/task/form',authcheck, crudappcontroller.form);
router.post('/task/form', crudappcontroller.form);

router.get('/notfound',authcheck, (req,res)=>{
    res.render("pages/crud_app/notfound")
});

router.get('/task/edit',authcheck, crudappcontroller.updateform);
router.post('/task/api/update',crudappcontroller.update);


// ========================================= crud app with AJAX task ========================================//

router.get('/stepform',authcheck, crudajax.multistepfrom);

// =========== API'S ==========// 
router.get('/api/getstate',authcheck, crudajax.getstate);
router.get('/api/city', authcheck,crudajax.getcity);
router.get('/students',authcheck, crudajax.students);
router.post('/api/insertBasicData', insert.insertBasicData);
router.get('/api/students',authcheck, fetch_stu_data.fetchAllStudents);
router.get('/api/fetch_single_data',authcheck, fetch_single_data.fetch_single_data);
router.post('/api/updateAllData', update.updateAllData);

// ========================================= Exam Result task ========================================//

router.get("/getExamResult",authcheck, examresult.getResult);
router.get("/getMoreInfoOfResult",authcheck, examresult.getMoreInfo);


// ========================================= all Fild filter task ========================================//

router.get('/filtergrid',authcheck,fieldsfilter.gridFilter);
router.post('/filtergrid',fieldsfilter.gridFilter);


// ========================================= sorting and pagination ========================================//
router.get('/task',authcheck,fieldsfilter.task);

module.exports = router;