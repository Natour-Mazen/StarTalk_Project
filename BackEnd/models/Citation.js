const mongoose = require("mongoose");

const CitationSchema = new mongoose.Schema({
    title:{
        type:String,
        required:true,
        maxLength:50,
    },
    description:{
        type:String,
        required:true,
    },
    numberLike:{
        type: Number,
        default:0,
    },
    likes: [{
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User',
        unique:true,
    }],
    favs: [{
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User',
        unique:true,
    }],
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
    }
})

const Citation = mongoose.model('Citation', CitationSchema);

module.exports = Citation;