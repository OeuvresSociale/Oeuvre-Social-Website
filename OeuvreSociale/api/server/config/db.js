const mongoose = require("mongoose");
const Grid = require("gridfs-stream");
Grid.mongo = mongoose.mongo;
const multer = require("multer");
const { GridFsStorage } = require("multer-gridfs-storage");
const { GridFSBucket, ObjectId } = require("mongodb");

let gfs;
let db;
let bucket;

const connectDB = async () => {
  try {
    const conn = await mongoose.connect(process.env.mongodb_url);
    console.log(`DB is connected: ${conn.connection.host}`);

    // Initialize GridFS
    db = conn.connection.db;
    gfs = Grid(db, mongoose.mongo);
    gfs.collection("uploads");
    // Initialize GridFS bucket with the name "uploads"

    console.log("GridFS initialized successfully");
  } catch (error) {
    console.error("Error connecting to MongoDB:", error);
  }
};

module.exports = { connectDB, gfs };
