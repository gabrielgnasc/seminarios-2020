//const Dev = require('../models/Dev');
const User = require('../models/User');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const authConfig = require('./../config/auth');

module.exports = {

    async index(req, res){
        console.log(res)
        if (req.body.email && req.body.password ) {
 
            var userData = {
                email: req.body.email,
                password: req.body.password
            };

            var userLogin = await User.findOne({email: userData.email}).select('+password');
             
            if (!userLogin)  {
                return res.status(400).json({error: "Usuário ou senha inválido"});
            }

            if(!await bcrypt.compare(userData.password, userLogin.password)){
                return res.status(400).json({error: "Usuário ou senha inválido"});
            }
            userLogin.password = undefined;

            const token = jwt.sign({ id: userLogin.id }, authConfig.secret, {
                expiresIn: 86400,
            })

            res.json({userLogin, token});
        }
    }
}