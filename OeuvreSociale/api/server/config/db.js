const mongoose = require("mongoose");
const Grid = require('gridfs-stream');
Grid.mongo = mongoose.mongo;
const multer = require('multer');
const { GridFsStorage } = require('multer-gridfs-storage');
let gfs;
let db;
const connectDB = async () => {
    try {
        const conn = await mongoose.connect(process.env.mongodb_url);
        console.log(`DB is connected: ${conn.connection.host}`);
        // Initialize GridFS
         db = conn.connection.db;
        gfs = Grid(db, mongoose.mongo);
        gfs.collection('uploads');

        console.log('GridFS initialized successfully');
       
    } catch (error) {
        console.error('Error connecting to MongoDB:', error);
    };
}
 
module.exports = { connectDB, gfs };



