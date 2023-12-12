const mongoose = require('mongoose');

const CitationHumorSchema = new mongoose.Schema({
    description:{
        type: String,
        unique:true,
    },
});

const CitationHumor = mongoose.model('CitationHumor', CitationHumorSchema);

module.exports=CitationHumor;