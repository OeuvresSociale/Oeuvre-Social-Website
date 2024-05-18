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
    imageId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'image',
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
    visible:{
    type:Boolean,  
    default:false
    }
});

const offreModel = mongoose.model('offre', offreSchema);

module.exports = offreModel;
