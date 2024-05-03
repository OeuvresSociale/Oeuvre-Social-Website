// const fs = require("fs");
// const { GridFSBucket } = require("mongodb");
// const { db } = require("../config/db");
// // Assuming you have already configured your MongoDB connection and obtained the 'db' object

// // Create a GridFSBucket instance
// const bucket = new GridFSBucket(db);
// function upload(request, result) {
//   // get input name="file" from client side
//   const file = request.files.file;

//   // set file path in MongoDB GridFS
//   // this will be saved as "filename" in "fs.files" collection
//   const filePath = new Date().getTime() + "-" + file.name;

//   // read user uploaded file stream
//   fs.createReadStream(file.path)

//     // add GridFS bucket stream to the pipe
//     // it will keep reading and saving file
//     .pipe(
//       bucket.openUploadStream(filePath, {
//         // maximum size for each chunk (in bytes)
//         chunkSizeBytes: 1048576, // 1048576 = 1 MB
//         // metadata of the file
//         metadata: {
//           name: file.name, // file name
//           size: file.size, // file size (in bytes)
//           type: file.type, // type of file
//         },
//       })
//     )
//     // this callback will be called when the file is done saving
//     .on("finish", function () {
//       result.send("File saved.");
//     });
// }
// module.exports = {
//   upload,
// };
