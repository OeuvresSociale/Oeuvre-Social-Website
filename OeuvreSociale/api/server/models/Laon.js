const mongoose = require('mongoose');

const schema = mongoose.Schema;

const laonSchema = new schema({
    purpose:{
        type:String,
        required:true
    },
    amount:{
        type:Number,
        required:true 
    },
    duration:{
        type:Number,
        required:false,
        default:12
    },
    reimburse:{
        type:Number
    },
    complete:{
        type:Boolean,
        default:true,
        required:false
    },
    employeeId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'user',
        required: true
    },
    requestTypeId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'typeloan',
        required: true
    },
    creationDate: {
        type: Date,
        default: Date.now,
        required: true
    },
    answerDate: {
        type: Date
    },
    state: {
        type: String,
        enum: ['En attente', 'Approuvée', 'Rejetée'],
        default: 'En attente',
        required: true
    },
    motif: {
        type: String,
        required:false
    },
    validated:{ // for tresorerie
        type:Boolean,
        default:false
    }
    
})


const laonModel =mongoose.model('laonModel',laonSchema);

module.exports=laonModel;
