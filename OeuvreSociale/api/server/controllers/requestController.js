const Request = require("../models/request");
const Employee = require("../models/user");
const TypeRequest = require("../models/typeRequest");


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
    const Requests = await Request
   
    .find(
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
    const request = await Request.findById(req.params.id , { files: 1 })
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
///////////////////////////////// /////////////////////////////////////////////////////////////////////////////////////////
//create a new  request(faire une demande par employee)
const createRequest = async (req, res) => {
  try {
    // Extract file information from req.files array
    const filesData = req.files.map((file) => ({
      fileId: file.filename, // Assuming you're using multer to store files locally
      filename: file.originalname,
    }));

    // Create a new instance of RequestModel with files data
    const request = new Request({
      creationDate: new Date(),
      requestTypeId: req.body.requestTypeId,
      employeeId: req.body.employeeId,

      files: filesData, // Set files array with file information
    });
    // Save the new request to the database
    const savedRequest = await request.save();

    // Respond with the saved request
    res.status(201).json(savedRequest);
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


module.exports = {
  getRequest,
  getallRequests,
  getMyRequests,
  createRequest,
  suiviRequest,
  
};
