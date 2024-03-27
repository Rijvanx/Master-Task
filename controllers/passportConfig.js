const jwt = require('jsonwebtoken');
const JwtStrategy = require('passport-jwt').Strategy;
const ExtractJwt = require('passport-jwt').ExtractJwt;
const common = require('./common/function');

exports.initializingPassport = (passport) =>{
    passport.use(new JwtStrategy(async (email,password,done)=>{
        try{
            const user = await common.RunQuery("select * from student where email = ?",[email]);

            if(user.length > 0){
                return done(null,user);
            }else{
                return done(null,false);
            }
        } catch(err){
            return done(err, false);
        }
    }))
};