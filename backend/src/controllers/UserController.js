const User = require('../models/User');
const Auth = require('../middlewares/auth');

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
    }
}