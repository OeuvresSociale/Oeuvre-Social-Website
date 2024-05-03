const mongoose = require('mongoose');

const schema = mongoose.Schema;

const transactionSchema = new schema({
    id:{
        type:Number
    },
    name:{
        type:String,
    },
    title:{     //le titre :offre ou autre (demande at loan automatique)
        type:String,
    },
    type:{
        type:String,
        enum: ['demande', 'loan','annoce','autre']
    },
    categorie:{
        type:String,
        enum: ['income', 'outcome']
    },
   Amount:{
        type:Number
       
    },
    creationDate:{
        type:Date,  
        default:Date.now
    },
    facture:{
     type: [{
        fileId: String, 
        filename: String,
    }],
    // validate: [arrayMinLengthValidator, 'Files array must have at least one element'],
    // required: true
    },
    
    requestId:{
        type: mongoose.Schema.Types.ObjectId,
        ref: 'request',
        // required: true
    }
    
})

const transaction =mongoose.model('transaction',transactionSchema);

module.exports=transaction;