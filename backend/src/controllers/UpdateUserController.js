//const Dev = require('../models/Dev');
const User = require('../models/User');
const jwt = require('jsonwebtoken');
const authConfig = require('../config/auth.json');

module.exports = {

    async index(req, res, next){

        const authHeader = req.headers.authorization;

        if(!authHeader)
            return res.json({error : 'Você não está autorizado'});

        const parts = authHeader.split(' ');
        
        if( !parts.length === 2 )
            return res.json({error : 'Erro na autorização do token'});

        const [ scheme, token ] = parts;

        if(!/^Bearer$/i.test(scheme) )
            return res.json({error : 'Erro na formação do token'});

        
        jwt.verify(token, authConfig.secret, (err, decoded) =>{
            if(err) return res.json({error : 'Token inválido !'});

            req.userId = decoded.id;
            return next();
        });
    
                
        var userData = req.body

        // insert into mongo with Schema's create method from mongoose
        var updateUser = await User.update(userData, function(error, user) {
            if (error)  {
                return res.json({error});
            } else {
                // follow up action
                update = "Usuário Atualizado com sucesso !";
                return res.json({updateUser, maessage: update});
            }
        });

    }
}