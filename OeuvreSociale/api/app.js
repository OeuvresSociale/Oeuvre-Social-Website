const express =require("express"); 
const dotenv =require("dotenv").config();
const bodyParser =require("body-parser");
const mongoose = require ("mongoose");  
const {connectDB}=require('./server/config/db');
const router = require('./server/routes/admin.js');
const employeeRouter = require('./server/routes/employeeManagement.js');
const typeRequestRouter = require('./server/routes/requestType.js');
const requestRouter = require('./server/routes/request.js'); 
const MongoStore =require('connect-mongo');
const user =require('./server/models/user'); 
const helmet = require('helmet');
// const rateLimit = require('express-rate-limit');
const session = require('express-session');
const morgan=require('morgan');
const tresuryRouter = require('./server/routes/tresury.js');
const offreRouter = require('./server/routes/offre.js');
const reunionRouter = require("./server/routes/reunions.js");

const app = express();
const cors = require("cors");
/** */
const corsOptions = {
  origin: "http://localhost:3000",
  credentials: true, //access-control-allow-credentials:true
  optionSuccessStatus: 200,
};
app.use(cors(corsOptions));
app.use(express.json());
const port = 8000 || process.env.port;

// app.use(session({
//     secret: 'keyboard cat',
//     resave :false,
//     saveUninitialized :true,
//     store :MongoStore.create({
//     mongoUrl :process.env.mongodb_url

//     })
// }));

/** HTTP GET Request */
app.get("/", (req, res) => {
  res.status(201).json("Home GET Request");
});

app.use(express.json());
app.use(bodyParser.json()); // for parsing application/json
app.use(bodyParser.urlencoded({ extended: true }));
app.use(helmet()); /**Use the helmet middleware to set secure HTTP headers, 
                    adding an extra layer of protection against common web vulnerabilities.*/
//app.use(morgan('dev'));
 
// Define the rate limiter
// const limiter = rateLimit({
//     windowMs: 15 * 60 * 1000, // 15 minutes: This value is used to define the duration of the time window during which the rate limit is enforced
//     max: 100, // limit each IP to 100 requests per window
//   });

/**api routes*/
 
app.use('/api',router);
app.use('/api',employeeRouter);
app.use('/api',typeRequestRouter);
app.use('/api',requestRouter);
app.use('/api',tresuryRouter);
app.use('/api',offreRouter);
app.use('/api',reunionRouter);

// Assume 'YourModel' is the Mongoose model representing your collection
// const RequestModel = require("./server/models/request.js");
// RequestModel.deleteMany()
//   .then((result) => {
//     console.log(`${result.deletedCount} documents deleted successfully.`);
//   })
//   .catch((error) => {
//     console.error('Error deleting documents:', error);
//   }); 



// const offreModel =require('./server/models/offres.js');
// const newOffre = new offreModel({
//     title: "Premier offre",
//     desc: "welcome",
//     dateDebut: new Date("2024-04-30T08:50:33.673Z"),
//     dateFin: new Date("2024-05-30T08:50:33.673Z")
// });
// newOffre.save()
//     .then(savedOffre => {
//         console.log('New offre has been created:', savedOffre);
//     })
//     .catch(err => {
//         console.error('Error creating offre:', err);
//     });
 


//connection to DB
connectDB()
  .then(() => {
    try {
      app.listen(port, () => {
        console.log(`app listening on port ${port}`);
      });
    } catch (error) {
      console.log("cannot conncet to the server...! ");
    }
  })
  .catch((error) => {
    console.log("Invalid database conncetion...! ");
  });
