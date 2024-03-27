const express = require("express");
const router = express.Router();
const controller = require('./controllers/controller');
const registation = require('./controllers/api/registation');
const controllergrid =  require('./controllers/TaskControllers/gridcontroller');

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


// ========================================== Dyamic Table  ========================================//

router.get('/KukuCube/kukucube',(req,res)=>{
    res.render('pages/kukucube/kukucube')
})

// ========================================== KukuCube ========================================//

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


module.exports = router;