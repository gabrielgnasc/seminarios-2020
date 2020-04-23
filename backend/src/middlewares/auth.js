const jwt = require('jsonwebtoken');
const authConfig = require('../config/auth.json');

module.exports = {

    async index(req, res, next){
       
        const authHeader = req.headers.authorization;

        if(!authHeader)
            return res.status(400).json({error : 'Você não está autorizado'});

        const parts = authHeader.split(' ');
        
        if( !parts.length === 2 )
            return res.status(400).json({error : 'Erro na autorização do token'});

        const [ scheme, token ] = parts;

        if(!/^Bearer$/i.test(scheme) )
            return res.status(400).json({error : 'Erro na formação do token'});

        
        jwt.verify(token, authConfig.secret, (err, decoded) =>{
            if(err !== null) return res.status(400).json({error : 'Token inválido !'});
        });

    }
}
