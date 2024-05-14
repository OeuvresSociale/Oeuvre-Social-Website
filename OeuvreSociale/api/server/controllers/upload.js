const { MongoClient, GridFSBucket } = require("mongodb");
const { GridFsStorage } = require("multer-gridfs-storage");
const multer = require("multer");  
// Initialize GridFS bucket globally
let bucket;

// MongoDB connection URI
const mongoURI = process.env.mongodb_url;
MongoClient.connect(mongoURI, function (err, client) {
  if (err) {
    console.error("Error connecting to MongoDB:", err);
    return;
  }

  // Initialize GridFS bucket with the name "uploads"
  const db = client.db(); // Get the database instance
  bucket = new GridFSBucket(db, { bucketName: "uploads" });

  console.log("GridFS initialized successfully");
});
const getFileIdByFilename = async (filename) => {
  try {
    const file = await bucket
      .find({ filename: filename })
      .project({ _id: 1 })
      .toArray();
    if (file.length === 0) {
      return null; // File not found
    }
    return file[0]._id;
  } catch (error) {
    console.log("Error finding file by filename:", error);
    throw error;
  }
};

const downloadFileById = async (fileId, res) => {
  try {
    // Check if file exists
    const file = await bucket.find({ _id: fileId }).toArray();
    if (file.length === 0) {
      return res.status(404).json({ error: { text: "File not found" } });
    }

    // set the headers
    res.set("Content-Type", file[0].contentType);
    res.set("Content-Disposition", `attachment; filename=${file[0].filename}`);

    // create a stream to read from the bucket
    const downloadStream = bucket.openDownloadStream(fileId);

    // pipe the stream to the response
    downloadStream.pipe(res);
  } catch (error) {
    console.log(error);
    res.status(400).json({ error: { text: `Unable to download file`, error } });
  }
};

const downloadFileByFilename = async (filename, res) => {
  try {
    // Get fileId by filename
    const fileId = await getFileIdByFilename(filename);
    if (!fileId) {
      return res.status(404).json({ error: { text: "File not found" } });
    }

    // Call downloadFileById with the retrieved fileId
    await downloadFileById(fileId, res);
  } catch (error) {
    console.log("Error downloading file:", error);
    res.status(400).json({ error: { text: `Unable to download file`, error } });
  }
};

// Create storage engine
function upload() {
  const mongodbUrl = process.env.mongodb_url;
  const storage = new GridFsStorage({
    url: mongodbUrl,
    file: (req, file) => {
      return new Promise((resolve, _reject) => {
        const fileInfo = {
          filename: file.originalname,
          bucketName: "uploads",
        };
        resolve(fileInfo);
      });
    },
  });

  return multer({ storage });
}
///
// async function downloadFiles(req, res) {
//   try {
//     const files = await bucket.find().toArray();
//     if (files.length === 0) {
//       return res.status(404).json({ error: { text: "No files found" } });
//     }
//     res.set("Content-Type", "application/zip");
//     res.set("Content-Disposition", `attachment; filename=files.zip`);
//     res.set("Access-Control-Allow-Origin", "*");
//     const archive = archiver("zip", {
//       zlib: { level: 9 },
//     });

//     archive.pipe(res);

//     files.forEach((file) => {
//       const downloadStream = bucket.openDownloadStream(
//         new mongoose.Types.ObjectId(file._id)
//       );
//       archive.append(downloadStream, { name: file.filename });
//     });

//     archive.finalize();
//   } catch (error) {
//     console.log(error);
//     res.status(400).json({
//       error: { text: `Unable to download files`, error },
//     });
//   }
// }

module.exports = { downloadFileByFilename, upload };
