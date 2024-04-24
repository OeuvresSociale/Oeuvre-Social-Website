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
    creationDate: {
        type: Date,
        default: Date.now,
        required: true
    }
});

const offreModel = mongoose.model('offre', offreSchema);

module.exports = offreModel;
