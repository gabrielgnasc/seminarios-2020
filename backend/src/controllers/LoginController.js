//const Dev = require('../models/Dev');
const User = require('../models/User');


module.exports = {

    async index(req, res){
        if (req.body.email &&
            req.body.password ) {
    
            if (!req.body.password) {
                error ="passwords is required";
                return res.status(400).json({error});
            }
            else {
                
                var userData = {
                    email: req.body.email,
                    password: req.body.password
                };
    
                var userLogin = await User.findOne({email: userData.email});
                console.log(userLogin);
                error = "Usuário ou senha inválido";
                    if (userLogin)  {
                        if(userData.password === userLogin.password){
                            return res.json({userLogin});
                        }else{
                            res.json({error});
                        }
                    } else {
                    
                        res.json({error});   
                    }
            }
        } else {
            error ="All fields required";
            res.json({error});
            return ;
        }
    }
}