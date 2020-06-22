
const User = require('../models/User');
const Auth = require('../middlewares/auth');
const bcrypt = require('bcrypt');
const path = require('path');
const fs = require('fs');
const {promisify} = require('util');
require('dotenv').config();

module.exports = {

    async index(req, res, next){

        await Auth.index(req,res,next);


        const {user} = req.body
        var query = {'email': user.email};  

        if (user.file){
            const {oldFile} = user.file;
        
            if(oldFile !== null && oldFile !== '' && oldFile !== undefined){
                const fileName = oldFile.replace(process.env.BASE_URL + 'files/', '');
                promisify(fs.unlink)(path.resolve(__dirname, '..', '..', 'uploads', fileName));
            }
        }
        
        var updateUser = await User.findOneAndUpdate(query, user, {returnNewDocument: true}, function(error, user) {
            if (error)  {
                return res.json({error});
            } else {
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
            return res.status(400).send({error: "Senha inválida"});
        }

        if(!await bcrypt.compare(userReq.senhaAntiga, user.password).catch((err) => {})){
            return res.status(400).send({error: "Senha inválida"});
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