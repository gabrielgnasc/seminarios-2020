const User = require('../models/User');
const Auth = require('../middlewares/auth');
const jwt = require('jsonwebtoken');
const authConfig = require('../config/auth.json');

module.exports = {

    async index(req, res, next){

        await Auth.index(req,res,next);

        const {params} = req;
        const token = params.token;
        
        if(!token)
        return res.json({error : 'Você não está autorizado'});
        var id ;
    
        jwt.verify(token, authConfig.secret, (err, decoded) =>{
            if(err) return res.json({error : 'Token inválido !'});
            id = decoded.id;
        });

        const user = await User.findOne({ _id: id});
        return res.json(user);     
    },

}