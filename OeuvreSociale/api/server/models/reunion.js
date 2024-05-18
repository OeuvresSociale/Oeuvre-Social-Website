const mongoose = require('mongoose');

const reunionSchema = new mongoose.Schema({  
    title: { 
        type: String,
        required: true,
    },   
    desc: {  
        type: String,  
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
    files: {
        type: [ 
          {
            fileName: String,
            fileOriginalName: String,
          },
        ],
      },
});

const reunion = mongoose.model('reunion', reunionSchema);

module.exports = reunion;