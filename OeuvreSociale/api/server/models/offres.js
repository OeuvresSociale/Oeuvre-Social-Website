const mongoose = require('mongoose');

const offreSchema = new mongoose.Schema({  
    title: { 
        type: String,
        required: true,
    },  
    desc: {  
        type: String,
        required: false, 
    },
    docs: {
        type: [String],  
        required: false,
    },
    dateDebut:{ 
        type: Date,
        required: true
    },
    dateFin:{ 
        type: Date,
        required: true
    },
    creationDate: {
        type: Date,
        default: Date.now,
        required: true
    },
    invisible:{
    type:Boolean,  
    default:false
    }
});

const offreModel = mongoose.model('offre', offreSchema);

module.exports = offreModel;
