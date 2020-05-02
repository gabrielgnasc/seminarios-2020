
const User = require('../models/User');
const Auth = require('../middlewares/auth');
const bcrypt = require('bcrypt');
// const pathModule = require('path');

module.exports = {

    async index(req, res, next){

        const {originalname: name, size, filename: key} = req.file;

        const file = {
            name : name,
            size : size,
            key : key,
            url : `http://localhost:3333/files/${key}`,
        }
        return res.json({file})
        
    }
}