const express = require("express");
const router = express.Router();
const controller = require('./controllers/controller');
const registation = require('./controllers/api/registation');

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



module.exports = router;