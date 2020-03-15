//const Dev = require('../models/Dev');
const User = require('../models/User');


module.exports = {

    async index(req, res){
        console.log(req.body)
        if (req.body.name &&
            req.body.email &&
            req.body.password &&
            req.body.confirmPassword) {
    
            if (req.body.password !== req.body.confirmPassword) {
                error ="passwords do not match";
                return res.json({error});
            }
            else {
                
                var userData = {
                    email: req.body.email,
                    name: req.body.name,
                    password: req.body.password,
                    role: 'user',
                    type: req.body.type
                };
    
                // insert into mongo with Schema's create method from mongoose
                var createdUser = await User.create(userData, function(error, user) {
                    if (error)  {
                        return res.json({error});
                    } else {
                        // follow up action
                        return res.json(createdUser);
                    }
                });

            }
        } else {
            error ="All fields required";
            return res.json({error});
        }
    }
}