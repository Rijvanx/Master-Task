const jwt = require('jsonwebtoken');
const JwtStrategy = require('passport-jwt').Strategy;
const ExtractJwt = require('passport-jwt').ExtractJwt;
const common = require('./common/function');

exports.initializingPassport = (passport) =>{
    passport.use(new JwtStrategy(async (email,password,done)=>{
        try{
            const user = await common.RunQuery("select * from student where email = ?",[email]);

            if(user.length > 0){
                return done(null,user[0]);
            }else{
                return done(null,false);
            }
        } catch(err){
            return done(err, false);
        }
    })
    );


    passport.serializeUser((user,done) =>{
        done(null,user.id)
    });

    passport.deserializeUser(async (id, done) =>{
        try{
            const user = await common.RunQuery("select * from student where id = ?",[id]);

            done(null,user[0])
        }
        catch(err){
            done(err,false)
        }
    })

};