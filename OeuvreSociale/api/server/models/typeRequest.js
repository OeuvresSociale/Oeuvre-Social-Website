const mongoose = require('mongoose');

// Define the schema for the type request
const typeRequestSchema = new mongoose.Schema({
    //we use the id that mongo give it 
    title: {
        type: String,
        required: true,
        //unique: true
    },
    desc: {
        type: String,
        required: false, 
    },
    docs: {
        type: [String], // We'll store the values in an array for validation
        required: false,
        //set dont accept the repetion but the array accept it
    }
         
});

const typeRequest = mongoose.model('typeRequest', typeRequestSchema);

// Export the model
module.exports = typeRequest;