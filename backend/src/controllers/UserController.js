const User = require('../models/User');

module.exports = {

    async store(req, res){

        const { params } = req; 
        const id = params.id;
        const user = await User.findOne({ _id: id});
        return res.json(user);     
    },

    async index(req, res){

        const users = await User.find();
        return res.json(users);
    }
}