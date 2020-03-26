const User = require('../models/User');
const Auth = require('../middlewares/auth');


module.exports = {

    async index(req, res, next){

        await Auth.index(req,res,next);
        
        const {params} = req;

        const id = params.id;

        const user = await User.deleteOne( {'_id': id}, (err)=>{ res.json({err});});

        return res.json({ user });
    }
}