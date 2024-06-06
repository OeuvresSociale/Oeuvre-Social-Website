const mongoose = require ('mongoose');

const schema = mongoose.Schema;
const userSchema = new schema ({
    idEmployee:{
        type:String,
        required : true,
        unique: [true,"id Exist"]
    },
    familyName:{
        type:String,
        required : true,
        unique : false
        
    },
    firstName:{
        type:String,
        required:true,
        unique : false
        
    },
    password:{ 
        type:String,
        required:true,
        unique : false,
      //  default :function() {
       //     return this.idEmployee; // Dynamically set default value
       // }
    },
    email:{
    type: String,
    required : true,
    unique: true
    },
    phoneNumber:{
        type:String,
        required:true,
        unique : true
    },
    sexe:{
        type:String,
        required:true, 
        
    }, 
    familysitution:{
        type:String,
        required:true,
        
    },
    numberOfChild:{
        type:String,
        required:false,
        unique : false, default :"0"
    },
    bankAccount:{
        type:String,
        required:true,
        unique : true
    },
    monthlySalary:{
        type:Number,
        required:true,
        unique : false
    },
    dateStartJob:{
        type:Date,
        required:false
        
    },
    role:{
        type:String,
        required:true,

        enum:['president','tresorerie','membre','employe'],
        default :"employe"

       
    },
    profilePicture:{
        type:mongoose.Schema.Types.ObjectId,
        required:false,
        unique : false,
        ref: 'imageModel'
    },


});


const UserModel = mongoose.model('user',userSchema);

module.exports = UserModel;
