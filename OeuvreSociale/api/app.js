const express =require("express");
const dotenv =require("dotenv").config();
const bodyParser =require("body-parser");
const mongoose = require ("mongoose");
const {connectDB}=require('./server/config/db');
const router = require('./server/routes/admin.js');
const employeeRouter = require('./server/routes/EmployeeManagement.js');
const typeRequestRouter = require('./server/routes/requestType.js');
const requestRouter = require('./server/routes/request.js');
const MongoStore =require('connect-mongo');
const user =require('./server/models/user');
const helmet = require('helmet');
const rateLimit = require('express-rate-limit');
const session = require('express-session');
const morgan=require('morgan');


const app = express();
const cors = require('cors');
/** */
const corsOptions ={
    origin:'http://localhost:3000', 
    credentials:true,            //access-control-allow-credentials:true
    optionSuccessStatus:200
}
app.use(cors(corsOptions));
app.use(express.json());
const port = 8000|| process.env.port;

// app.use(session({
//     secret: 'keyboard cat',
//     resave :false,
//     saveUninitialized :true,
//     store :MongoStore.create({  
//     mongoUrl :process.env.mongodb_url 

//     })
// }));


/** HTTP GET Request */
app.get('/', (req, res) => {
    res.status(201).json("Home GET Request");
});
  

app.use(express.json())
app.use(bodyParser.json()) // for parsing application/json
app.use(bodyParser.urlencoded({ extended: true }))
app.use(helmet()); /**Use the helmet middleware to set secure HTTP headers, 
                    adding an extra layer of protection against common web vulnerabilities.*/
//app.use(morgan('dev'));


// Define the rate limiter
const limiter = rateLimit({
    windowMs: 15 * 60 * 1000, // 15 minutes: This value is used to define the duration of the time window during which the rate limit is enforced
    max: 100, // limit each IP to 100 requests per window
  });
  


/**api routes*/
app.use('/api',limiter,router);
app.use('/api',limiter,employeeRouter);
app.use('/api',limiter,typeRequestRouter);
app.use('/api',limiter,requestRouter);


//function insertuserData(){
   // user.insertMany([
   // {
      //  idEmployee:"1",
       // familyName:"meflah",
       // firstName:"yousra",
       // password:"esi",
       // email:"y.meflah@esi.sba.dz",
       // phoneNumber:"1234",
       // sexe:"f",
       // isMarried:false,
        //numberOfChild
       // bankAccount:"1234",
       // monthlySalary:12,
       // dateStartJob
        //isCommit:true
       // role
       // profilePicture:
   // },
   
   // ])
    

//} 


//} 

//insertuserData();










//connection to DB
connectDB().then(()=>{
    try {
        app.listen(port , ()=>{
            console.log(`app listening on port ${port}`);
        })
        
    } catch (error) {
      console.log('cannot conncet to the server...! ');  
        
    }
}).catch(error =>{
    console.log('Invalid database conncetion...! ');  
})

