const mongoose = require('mongoose');

const UserSchema = new mongoose.Schema({
    discordId:{
        type: String,
        unique:true,
    },
    pseudo: {
        type:String,
        minLength:5,
        maxLength:25,
        unique:true,
    },
    Role: {
        type:String,
        validate: {
            validator: function (role) {
                return role === 'ROLE_USER' || role === 'ROLE_ADMIN';
            },
            message: 'Le champ Role doit être "ROLE_USER" ou "ROLE_ADMIN".'
        }
    },
    allCitations:[{
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Citation',
    }],
    allFavorite:[{
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Citation',
    }]
});

const User = mongoose.model('Users', UserSchema);

module.exports=User;
