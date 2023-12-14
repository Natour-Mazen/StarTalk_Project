
const mongoose = require('mongoose');

const CitationHumorSchema = new mongoose.Schema({
    type:{
        type: String,
        unique:true,
        maxLength:25
    },
});

const CitationHumor = mongoose.model('CitationHumor', CitationHumorSchema);

module.exports=CitationHumor;