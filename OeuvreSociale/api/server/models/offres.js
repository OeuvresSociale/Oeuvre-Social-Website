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
        type: Boolean,    
        default: false
    },
    // dead:{ // stop appearing for both employee and admin
    //     type: Boolean,  
    //     default: false
    // }
});

// Add a virtual property to compute isDead based on dateFin
// offreSchema.virtual('isVisible').get(function() {
//     const now = new Date();
//     return this.dateFin < now;
// });

// // Ensure virtual fields are serialized
// offreSchema.set('toJSON', { virtuals: true });
// offreSchema.set('toObject', { virtuals: true });

const offreModel = mongoose.model('offre', offreSchema);

module.exports = offreModel;
