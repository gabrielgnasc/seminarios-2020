//const Dev = require('../models/Dev');
const User = require('../models/User');
const Auth = require('../middlewares/auth');
const bcrypt = require('bcrypt');
// const fs = require('fs');
// const pathModule = require('path');

module.exports = {

    async index(req, res, next){

        await Auth.index(req,res,next);

        const {user} = req.body

        var query = {'email': user.email};
        // insert into mongo with Schema's create method from mongoose
        var updateUser = await User.findOneAndUpdate(query, user, {returnNewDocument: true}, function(error, user) {
            if (error)  {
                return res.json({error});
            } else {
                // follow up action
                update = "Usuário Atualizado com sucesso !";
                return res.json({updateUser: user, message: update});
            }
        });

    },

    async updateSenha(req, res, next){

        await Auth.index(req,res,next);

        let {user} = req.body;
        const userReq = user;

        var query = {'email': userReq.email};


        user = await User.findOne({email: userReq.email}).select('+password');

             
        if (!user)  {
            return res.status(400).json({error: "Senha inválido"});
        }

        if(!await bcrypt.compare(userReq.senhaAntiga, user.password)){
            return res.status(400).json({error: "Senha inválido"});
        }

        user.password =  await bcrypt.hash(userReq.senhaNova, 10);
        
        await User.findOneAndUpdate(query, user , {returnNewDocument: true}, function(error, user) {
            if (error)  {
                return res.json({error});
            } else {
                update = "Usuário Atualizado com sucesso !";
                return res.json({updateUser: user, message: update});
            }
        });
        

    }
}