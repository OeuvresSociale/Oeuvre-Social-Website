const mongoose = require('mongoose');

//we should add schema for vol (p eg: vol1 (20pv par an ?))
const pvSchema = new mongoose.Schema({
    
    title: {
        type: String,
        required: true,
        unique: true 
    }, 
    desc: {
        type: String
    },   
    files: {
        type: [{
            fileName: String, 
            fileOriginalName: String,
        }],   
    },
    creationDate:{
        type:Date,
        required:true,
        default:Date.now()
    },
});

const PV = mongoose.model('PV', pvSchema);

module.exports = PV;