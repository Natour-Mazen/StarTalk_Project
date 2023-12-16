const mongoose = require("mongoose");

const UserRefSchema = new mongoose.Schema({
    userId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User',
        required: true,
        unique: true,
    },
    userName: {
        type: String,
        required: true,
    }
}, {_id: false}); // _id: false is added to prevent creation of an ObjectId for each subdocument

const CitationSchema = new mongoose.Schema({
    title:{
        type:String,
        required:true,
        maxLength:25,
    },
    description:{
        type:String,
        required:true,
    },
    numberLike:{
        type: Number,
        default:0,
    },
    likes: [UserRefSchema],
    favs: [UserRefSchema],
    creationDate:{
        type: Date,
        default: Date.now
    },
    writerId:{
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User',
        required: true,
    },
    writerName:{
        type: String,
        required: true,
    },
    humor:{
        type: mongoose.Schema.Types.ObjectId,
        ref: 'CitationHumor',
        default: '657adf42d0dcd0b6a4af73e6'
    }
})

const Citation = mongoose.model('Citation', CitationSchema);

module.exports = Citation;