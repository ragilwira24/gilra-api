'uses strict'
var User = require('../../model/user.model');
var jwt = require('jsonwebtoken');
var bcrypt = require('bcrypt');
var HttpStatus = require('http-status-codes');
const dotenv = require('dotenv');
dotenv.config();

const secret = `${process.env.X_ACCESS_TOKEN}`

exports.login = function(req,res) {
    User.findOne({email: req.body.email}, function(err, user) {
       if(err){
        console.error.bind(console,'Error on the server');
        return res.status(HttpStatus.INTERNAL_SERVER_ERROR).send('Error on the server');
       }

       if (!user){
           console.error.bind(console,'User not found');
           return res.status(HttpStatus.INTERNAL_SERVER_ERROR).send('User not found');
       }

       var passwordIsValid = bcrypt.compareSync(req.body.password, user.password);
       if(!passwordIsValid) return res.status(HttpStatus.UNAUTHORIZED).send({ auth: false, token: null });

       var token = jwt.sign({id: user._id}, secret,{
           expiresIn: 86400
       });
       res.status(HttpStatus.OK).send({auth: true, token: token});
    });
}

exports.register = function(req, res) {

    User.findOne({email: req.body.email}, function(err, user) {
        
        if(err){
            console.error.bind(console,'Error on the server');
            return res.status(HttpStatus.INTERNAL_SERVER_ERROR).send('Error on the server');
        }
    
        if (!user){
            var hashedPassword = bcrypt.hashSync(req.body.password,8);
            req.body.password = hashedPassword;

            User.create(req.body, function(err, user_create) {
                if (err) {
                    console.error.bind(console,err);
                    return res.status(HttpStatus.INTERNAL_SERVER_ERROR).send(err);
                }
                res.status(HttpStatus.OK).json(user_create);
            });
        }else{
            console.error.bind(console,'User already created');
            return res.status(HttpStatus.INTERNAL_SERVER_ERROR).send('User already created');
        } 
    });
}

exports.testingApi = function(req, res) {
    return res.status(HttpStatus.OK).send('HEHHEHE');
}
