//const Dev = require('../models/Dev');
const User = require('../models/User');
const jwt = require('jsonwebtoken');
const authConfig = require('./../config/auth');

module.exports = {

    async index(req, res){
       const {email} = req.body;

        try{

            if(await User.findOne({email}))
                return res.json({error: 'O usuário já existe'})

            var createdUser = await User.create(req.body);
            createdUser.password = undefined;

            const token = jwt.sign({ id: createdUser.id }, authConfig.secret, {
                expiresIn: 86400,
            })

            return res.json({createdUser, token});
            
        }catch (err){
            return res.send({error: 'O usuário já existe'});
        }
        

    }
}