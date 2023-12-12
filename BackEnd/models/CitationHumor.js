const mongoose = require('mongoose');

const CitationHumorSchema = new mongoose.Schema({
    description:{
        type: String,
        unique:true,
        maxLength:15
    },
});

const CitationHumor = mongoose.model('CitationHumor', CitationHumorSchema);

module.exports=CitationHumor;