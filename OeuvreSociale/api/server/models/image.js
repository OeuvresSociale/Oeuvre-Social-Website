const mongoose = require('mongoose');

const schema = mongoose.Schema;

const imageSchema = new schema({
    name:{
        type:String,
        required:true
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

module.exports=mongoose.model('imageModel',imageSchema);