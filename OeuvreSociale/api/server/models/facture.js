const mongoose = require('mongoose');

const schema = mongoose.Schema;

const factureSchema = new schema({
    outcomeId:{
        type: mongoose.Schema.Types.ObjectId,
        ref: 'outcome',
        required: true  
    },
    creationDate:{
        type:Date,
        default:Date.now
    },
    file:[{
        fileId: String, 
        filename: String
    }]
    
}) 

const facture =mongoose.model('facture',factureSchema);

module.exports=facture;  