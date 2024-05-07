const mongoose = require('mongoose');

const schema = mongoose.Schema;

const imageSchema = new schema({ 
    name:{
        type:String,
    
    },
    image:{
        data:Buffer,
        contentType:String
    },
    employeeId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'user',
        required: true
    },
   
})
const imageModel =mongoose.model('imageModel',imageSchema);

module.exports=imageModel;
