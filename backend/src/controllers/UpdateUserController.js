//const Dev = require('../models/Dev');
const User = require('../models/User');


module.exports = {

    async index(req, res){
                
        var userData = req.body

        // insert into mongo with Schema's create method from mongoose
        var updateUser = await User.update(userData, function(error, user) {
            if (error)  {
                return res.json({error});
            } else {
                // follow up action
                update = "Usuário Atualizado com sucesso !";
                return res.json({update});
            }
        });

    }
}