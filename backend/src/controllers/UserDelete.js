const User = require('../models/User');


module.exports = {

    async index(req, res){
        
        const { params } = req;
        
        const id = params.id;

        const user = await User.deleteOne( {'_id': id}, (err)=>{ res.json({err});});

        return res.json({ user });
    }
}