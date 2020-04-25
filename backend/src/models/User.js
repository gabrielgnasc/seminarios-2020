var mongoose = require('mongoose');
const bcrypt = require('bcrypt');

var UserSchema = new mongoose.Schema({
    email: {
        type: String,
        unique: true, // no two users can create two same emails
        required: true,
        lowercase: true // removes whitespace accidentally
    },
    img:{
        
        data:Buffer,
        contentType: String,
        required: false,
    },
    name: {
        type: String,
        required: true,
    },
    password: {
        type: String,
        required: true,
        select: false,
    },
    createdAt:{
        type:Date,
        default: Date.now,
    },
    role: String,
    type: []
});

UserSchema.pre('save',async function(next){
    const hash =  await bcrypt.hash(this.password, 10);
    this.password = hash;
    next();
});



var User = mongoose.model("User", UserSchema);

module.exports = User;