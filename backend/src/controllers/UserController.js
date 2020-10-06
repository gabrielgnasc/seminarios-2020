const User = require('../models/User');
const Auth = require('../middlewares/auth');
const { Console } = require('console');
global.Buffer = global.Buffer || require('buffer').Buffer;


module.exports = {

    async store(req, res, next){

        await Auth.index(req,res,next);
        
        const {params} = req;

        const id = params.id;
        const user = await User.findOne({ _id: id});
        return res.json(user);     
    },

    async index(req, res){
        
        const users = await User.find();
        return res.json(users);
    },

    async getUserByEmail(req , res){

        const {params} = req;
        const parametros = params.param;

        const list = parametros.split("--sep--");
        const email = Buffer.from(list[0], 'base64').toString();

        const user = await User.findOne({email});

        if(user){
            var info;

            user.type.map((types) => {
                if(types.typeId === parametros){
                    info = types;
                    info.typeId = null;
                }
            })

            return res.json(info);

        }

        return res.json({'error': 'Não foi possível localizar o código lido!' })

    } 

}