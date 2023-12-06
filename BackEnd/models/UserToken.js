const mongoose = require('mongoose');

const UserTokenSchema = new mongoose.Schema({
    UserId:{
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User',
        unique:true,
        required:true
    },
    jwtToken: {
        type:String,
        required:true
    }
});

const UserToken = mongoose.model('UsersTokens', UserTokenSchema);

module.exports=UserToken;
