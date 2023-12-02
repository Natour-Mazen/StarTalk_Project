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
    creationDate:{
        type: Date,
        default: Date.now()
    },
    writerId:{
        type: String,
        required: true,
    },
    writerName:{
        type: String,
        required: true,
    }
})

const Citation = mongoose.model('Citation', CitationSchema);

module.exports = Citation;