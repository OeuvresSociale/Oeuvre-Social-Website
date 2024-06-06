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
    date:{ 
        type: Date,
        required: true
    },
    HeurDebut:{ 
        type: String,
        required: true,
        validate: {
          validator: function(v) {
            return /\b([01]?[0-9]|2[0-3]):[0-5][0-9]\b/.test(v); // Validates "HH:mm" format
          },
          message: props => `${props.value} is not a valid time format!`
        } 
    },
    HeurFin:{ 
      type: String,
        required: true,
        validate: {
          validator: function(v) {
            return /\b([01]?[0-9]|2[0-3]):[0-5][0-9]\b/.test(v); // Validates "HH:mm" format
          },
          message: props => `${props.value} is not a valid time format!`
        }
  },
     historique:{
        type: Boolean,
        default:false
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