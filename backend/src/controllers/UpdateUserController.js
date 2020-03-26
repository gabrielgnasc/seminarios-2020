//const Dev = require('../models/Dev');
const User = require('../models/User');
const Auth = require('../middlewares/auth');

module.exports = {

    async index(req, res, next){

        await Auth.index(req,res,next);
        
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