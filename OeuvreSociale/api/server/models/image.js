const mongoose = require('mongoose');

const schema = mongoose.Schema;

const imageSchema = new schema({
    name: {
        type: String,
        required: true
    },
    imagePath: {
        type: String,
        required: true
    },
    employeeId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'user', 
    },
    offreId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'offre',
    }
});


module.exports=mongoose.model('imageModel',imageSchema);
    
