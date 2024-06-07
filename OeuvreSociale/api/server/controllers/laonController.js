const Employee = require("../models/user");
const laonModel = require("../models/Laon");
const laonRepayment = require("../models/loanRepaymen");
const laonType = require("../models/LaonType");
const notify = require("../models/notification");


//Get all request for employee
const getMyLaon = async (req, res) => {
  //current page
  const page = req.query.page || 1;
  const RequestsPerPage = 10;
  const skipRequests = (page - 1) * RequestsPerPage;
  const filtre = req.query.filtre || "";
  try {
    const Requests = await laonModel
      .find(
        {
          employeeId: req.params.employeeId,
          state: { $regex: filtre, $options: "i" }, // Case-insensitive search
        },
        { creationDate: 1, state: 1, motif: 1 }
      )
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
//Get all request for member  with search and pagination
const getallLaon = async (req, res) => {
  // Current page
  const page = req.query.page || 1;
  const RequestPerPage = 10;
  const skipRequests = (page - 1) * RequestPerPage;
  const filter = req.query.filter || "";

  try {
    const Requests = await laonModel
      .find(
        { $or: [{ state: { $regex: filter } }] },
        { creationDate: 1, state: 1, motif: 1 }
      )
      .populate("employeeId", "familyName firstName")
      .populate("requestTypeId")
      .sort({ creationDate: -1 })
      .skip(skipRequests)
      .limit(RequestPerPage);

    // Check if requests were found
    if (Requests.length === 0) {
      return res.status(401).json("There are no requests here");
    }

    // Send response
    res.status(200).json(Requests);
  } catch (error) {
    res.status(404).json({ message: error.message });
  }
};
//////////////////////////////////
//Get one request
const getLaon = async (req, res) => {
  try {
    const request = await laonModel
      .findById(req.params.id, { files: 1 })
      .populate(
        "employeeId",
        "idEmployee familyName firstName dateStartJob email phoneNumber"
      );
    console.log("id:", req.params.id);
    res.status(200).json(request);
  } catch (err) {
    // Handle errors
    res.status(500).json(err);
  }
};


// suive request

const suiviLaon = async (req, res) => {
  try {
    const request = await laonModel.findById(req.params.id);

    try {
      const { employeeId, state } = req.body;

    // Validate required fields
    if (!employeeId) {
      return res.status(400).json({ error: "Employee ID is required" });
    }

    if (!state) {
      return res.status(400).json({ error: "State is required" });
    }

      const updatedRequest = await laonModel.findByIdAndUpdate(
        req.params.id,
        {
          $set: req.body, //only new state date answer and motif
        },
        { new: true }
      );
      //notification  
      const notification = new notify({
        employeeId: employeeId,
        title: "demande de pret",
        message: `votre demande de pret est ${state}`
      });

      await notification.save();

      res.status(200).json(updatedRequest);
      console.log("laon has been updated + notification is sent");
     
    } catch (error) {
      console.error(error);
      res.status(500).json({ error: "Internal server error" });
    }
  } catch {
    res.status(401).json("this request is not existed");
  }
};

////////////////////////////////////
/**
 * to test : http://localhost:8000/api/LaonRequest/
 * {
"creationDate": "2024-03-22T23:10:41.964Z",
"requestTypeId": "66006005f500de8c42d18efe", 
"employeeId": "66005c6bc766b8fe413dcf97",
"state": "En attente",
"reimburse":"12000",
"purpose":"to go to iftar",
"amount":"20000" ,  
"duration":12
}
 * 
*/

const createLaonRequest = async (req, res) => {
  try {
    const { employeeId, requestTypeId, amount, duration, purpose } = req.body;
    console.log("body:", req.body);

    // Retrieve user details from the database
    const user = await Employee.findById(employeeId);
    const type = await laonType.findById(requestTypeId);

    if (!user) {
      return res.status(404).json({ error: "User not found" });
    }

    const exist = await laonModel
      .find({ employeeId: employeeId })
      .sort({ creationDate: -1 })
      .limit(1);

    if (exist.length > 0 && !exist[0].complete) {
      return res.status(400).json({
        error: "Your past loan is not complete. You cannot request a new loan.",
      });
    }

    const salary = user.monthlySalary;
    const durée = duration;
    const percentage = type.maxPourcentage; // 30% of monthlySalary
    const maxAllowedReturnPerMonth = salary * percentage;
    const maxLoanAmount = maxAllowedReturnPerMonth * 12;

    // Validate loan amount against maximum allowed loan amount
    if (amount > maxLoanAmount) {
      return res
        .status(400)
        .json({ error: "Loan amount exceeds maximum allowed" });
    }

    const repaymentAmountPerMonth = amount / durée;

    // Validate repayment amount per month against maximum allowed
    if (repaymentAmountPerMonth > maxAllowedReturnPerMonth) {
      return res
        .status(400)
        .json({ error: "Repayment amount per month exceeds maximum allowed" });
    }

    console.log(
      `We will retrieve ${repaymentAmountPerMonth} from your account for ${durée} months.`
    );

    const result = {
      duration: durée,
      salary: salary,
      maxLoanAmount: maxLoanAmount,
      loanAmount: amount,
      maxAllowedRepaymentPerMonth: maxAllowedReturnPerMonth,
      repaymentPerMonth: repaymentAmountPerMonth,
      message: `We will retrieve ${repaymentAmountPerMonth} from your account for ${durée} months.`,
    };

    const request = new laonModel({
      ...req.body, // Include all fields from req.body
      reimburse: repaymentAmountPerMonth // Add the reimburse field
  });
  
  await request.save();

    res.status(200).json(result);
  } catch (error) {
    if (error.code === 11000) {
      console.error("Duplicate key error:", error);
      res
        .status(400)
        .json({ error: "Duplicate key error: This request already exists" });
    } else {
      console.error("Error saving request:", error);
      res.status(500).json({ error: "Internal server error" });
    }
  }
};

// const laonModel= require('../models/Laon');

// const getReq = async (req, res) => {
//   try {
//     const request = await laonModel.findById(req.params.id)
//       .populate("requestTypeId", "title")
//       .populate(
//         "employeeId",
//         "idEmployee familyName firstName dateStartJob email phoneNumber monthlySalary familysitution "
//       );
//     res.status(200).json(request);
//   } catch (err) {
//     // Handle errors
//     res.status(500).json(err);
//   }
// };

const getapprovedLoan = async (req, res) => {
 
  try {
    const approvedRequests = await laonModel.find({
      state: "Approuvée",
      validated: "false",
    })
      .populate("requestTypeId", "title")
      .populate("employeeId", "familyName firstName")
      .sort({ creationDate: -1 })
 

    if (!approvedRequests || approvedRequests.length === 0) {
      return res.status(404).json("There are no approved requests here");
    }

    res.status(200).json(approvedRequests);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

 


module.exports = {
  createLaonRequest,
  getMyLaon,
  getallLaon,
  getLaon,
  suiviLaon,
  getapprovedLoan
  // getReq
};
