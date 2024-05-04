const mongoose = require('mongoose');

const typeLoanSchema = new mongoose.Schema({
  
    title:{
        type:String,
        default:"demande de pret"
    },
    maxAmount: { 
        type: Number, 
        required: true,
        
    },
    maxMonth: {
        type: Number,
        required: true, 

    },
    maxPourcentage: {
        type: Number,
        required: true,
    },
    desc:{
        type: String,
        required: true,
    }
         
});

const typeLoan = mongoose.model('typeLoan', typeLoanSchema);

// Export the model
module.exports = typeLoan;