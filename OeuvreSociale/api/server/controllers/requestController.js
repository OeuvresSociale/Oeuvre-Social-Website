const Request = require("../models/request");
const Employee = require("../models/user");
const TypeRequest = require("../models/typeRequest");
const path = require("path");
const fs = require("fs");
const asyncWrapper = require("../middleware/asyncWrapper");
const { Console } = require("console");


//Get all request for employee
const getMyRequests = async (req, res) => {
  //current page
  const page = req.query.page || 1;
  const RequestsPerPage = 10;
  const skipRequests = (page - 1) * RequestsPerPage;
  const filtre = req.query.filtre || "";
  try {
    const Requests = await Request.find(
      {
        employeeId: req.params.employeeId,
        state: { $regex: filtre, $options: "i" }, // Case-insensitive search
      },
      { creationDate: 1, state: 1, motif: 1 }
    )
      .populate("requestTypeId", "title")
      .sort({ creationDate: -1 })
      .skip(skipRequests)
      .limit(RequestsPerPage)
      .exec();
    res.status(200).json(Requests);
    if (Requests.length === 0) {
      res.status(401).json("there is no  requests here");
    }
  } catch (error) {
    res.status(404).json({ message: error.message });
  }
};
//Get all request for member with search and pagination maybe used in the main
const getRequests = async (req, res) => {
  //current page
  const page = req.query.page || 1;
  const RequestPerPage = 10;
  const skipRequests = (page - 1) * RequestPerPage;
  const search = req.query.search || "En attente";
  try {
    const Requests = await Request.find({
      $or: [{ state: { $regex: search } }],
    })
      .sort({ creationDate: -1 })
      .skip(skipRequests)
      .limit(RequestPerPage)
      .exec();
    res.status(200).json(Requests);
    if (!Requests) {
      res.status(401).json("there is no  requests en On hold");
    }
  } catch (error) {
    res.status(404).json({ message: error.message });
  }
};
//Get all request for member  with search and pagination
const getallRequests = async (req, res) => {
  //current page
  const page = req.query.page || 1;
  const RequestPerPage = 10;
  const skipRequests = (page - 1) * RequestPerPage;
  const filter = req.query.filter || "";
  try {
    const Requests = await Request.find(
      {
        $or: [{ state: { $regex: filter } }],
      },
      { creationDate: 1, state: 1, motif: 1 }
    )
      .populate("requestTypeId", "title")
      .populate("employeeId", "familyName firstName")
      .sort({ creationDate: -1 })
      .skip(skipRequests)
      .limit(RequestPerPage);
    res.status(200).json(Requests);
    if (!Requests) {
      res.status(401).json("there is no  requests here");
    }
  } catch (error) {
    res.status(404).json({ message: error.message });
  }
};

//Get one request
const getRequest = async (req, res) => {
  try {
    const request = await Request.findById(req.params.id)
      .populate("requestTypeId", "title")
      .populate(
        "employeeId",
        "idEmployee familyName firstName dateStartJob email phoneNumber monthlySalary familysitution "
      );

    res.status(200).json(request);
  } catch (err) {
    // Handle errors
    res.status(500).json(err);
  }
};
const laonModel= require('../models/Laon');
const getReq = async (req, res) => {
  try {
    const request = await laonModel.findById(req.params.id)
      .populate("requestTypeId", "title")
      .populate(
        "employeeId",
        "idEmployee familyName firstName dateStartJob email phoneNumber monthlySalary familysitution "
      );

    res.status(200).json(request);
  } catch (err) {
    // Handle errors
    res.status(500).json(err);
  }
};
//////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
// controller function for creating a new request
const createRequest = async (req, res) => {
  try {
    // Create a new instance of RequestModel with files data
    const newRequest = new Request({
      creationDate: new Date(),
      requestTypeId: req.body.requestTypeId,
      employeeId: req.body.employeeId,
      // files: filesData, // Set files array with file information
    });

    // Save the request document to the database
    await newRequest.save();

    // Process uploaded files
    if (req.files) {
      const files = req.files.map((file) => ({
        fileName: file.filename, // Use the filename as fileId
        fileOriginalName: file.originalname,
      }));

      // Update the request document with file metadata
      newRequest.files = files;
      await newRequest.save();
    }

    res.status(201).json({
      message: "Request created successfully",
      request: newRequest.toObject(), // Convert to plain JavaScript object
    });
  } catch (error) {
    console.error("Error creating request:", error);
    res.status(500).json({ error: "Internal server error" });
  }
};


//////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
//update my  request we dont use it in our app

const updateMyRequest = async (req, res) => {
  try {
    const request = await Request.findById(req.params.id);
    if (req.body.employeeId === request.employeeId) {
      try {
        const updatedRequest = await Request.findByIdAndUpdate(
          req.params.id,
          {
            $set: req.body,
          },
          { new: true }
        );
        res.status(200).json(updatedRequest);
        console.log("Request has been updated");
      } catch (error) {
        console.error(error);
        res.status(500).json({ error: "Internal server error" });
      }
    } else {
      res.status(401).json("you can update only your request");
    }
  } catch {
    res.status(401).json("this request is not existed");
  }
};
// suive request
 
const suiviRequest = async (req, res) => {
  try {
    const request = await Request.findById(req.params.id);
    //authentication pour president et vice !!!!!!!!!!

    try {
      const updatedRequest = await Request.findByIdAndUpdate(
        req.params.id,
        {
          $set: req.body, //only new state date answer and motif
        },
        { new: true }
      );
      res.status(200).json(updatedRequest);
      console.log("Request has been updated");
    } catch (error) {
      console.error(error);
      res.status(500).json({ error: "Internal server error" });
    }
  } catch {
    res.status(401).json("this request is not existed");
  }
};

////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
//function to display the files
const uploadsDir = path.join(__dirname, "../uploads");
async function getFileById(req, res) {
  const requestId = req.params.requestId;
  const fileId = req.params.fileId;
  console.log(fileId);
  try {
    // Retrieve the request document from the database
    const request = await Request.findById(requestId);
    if (!request) {
      return res.status(404).send("Request not found");
    }

    // Access files directly from the request object
    const foundFile = request.files.find(
      (file) => file._id.toString() === fileId
    );
    if (!foundFile) {
      return res.status(404).send("File not found");
    }
    const filePath = path.join(uploadsDir, foundFile.fileName);
    res.sendFile(filePath);
  } catch (error) {
    console.error("Error retrieving file:", error);
    res.status(500).send("Internal Server Error");
  }
}


module.exports = {
  getRequest, 
  getallRequests,
  getMyRequests,
  createRequest,
  suiviRequest,
  getFileById,
  getReq,

};
