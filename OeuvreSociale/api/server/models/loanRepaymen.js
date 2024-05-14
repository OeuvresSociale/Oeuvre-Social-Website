const mongoose = require('mongoose');

const schema = mongoose.Schema;

const laonRepaymentSchema = new schema({
   title:{
    type:String,
    default:"Remboursement de pret"
   },
    amount:{
        type:Number, 
        required:true 
    },
    duration:{
        type:Number,
        required:false,
        
    },
    complete:{
        type:Boolean,  
        default:false,
        required:false
    },
    loanId:{
    type: mongoose.Schema.Types.ObjectId,
    ref: 'laonModel',
    required: true
    },
    
})


const laonRepayment =mongoose.model('laonRepayment',laonRepaymentSchema);

module.exports=laonRepayment;
