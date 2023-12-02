const mongoose = require('mongoose');

const UserTokenSchema = new mongoose.Schema({
    discordUserId:{
        type: String,
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
