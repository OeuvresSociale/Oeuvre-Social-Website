const mongoose = require("mongoose");

 const requestSchema = new mongoose.Schema({
    creationDate: {
        type: Date,
        default: Date.now,
        required: true,
    },
    requestTypeId: {
        type: mongoose.Schema.Types.ObjectId, 
        ref: 'typeRequest',
        required: true,
    }, 
    employeeId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'user',
        required: true
    },
    answerDate: {
        type: Date
    }, 
    state: {
        type: String,
        enum: ['En attente', 'Approuvée', 'Rejetée'],
        default: 'En attente',
        required: true,
    }, 
    motif: {
        type: String 
    },
    files: {
        type: [{
            fileName: String, 
            fileOriginalName: String,
        }],
        // validate: [arrayMinLengthValidator, 'Files array must have at least one element'],
        // required: true
    },
    validated:{ // for tresorerie
        type:Boolean,
        required:true,
        default:false
    }
});

// Custom validator function to check if the array has at least one element
// function arrayMinLengthValidator(value) {
//     return value && value.length > 0;
// }


const RequestModel = mongoose.model('RequestModel', requestSchema);

module.exports = RequestModel;
