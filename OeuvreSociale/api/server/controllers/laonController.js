const Employee = require("../models/user");
const laonModel = require("../models/Laon");
const laonRepayment = require("../models/loanRepaymen");
const laonType = require("../models/LaonType");
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

// if (!request) {
//   return res.status(404).json({ message: "Request not found" });
// }

// suive request

const suiviLaon = async (req, res) => {
  try {
    const request = await laonModel.findById(req.params.id);

    try {
      const updatedRequest = await laonModel.findByIdAndUpdate(
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
// const createLaonRequest = async (req, res) => {
//     try {
//         const { requestTypeId,employeeId, amount, duration ,purpose} = req.body;   //duration by default 12 months

//         // Retrieve user details from the database
//         const user = await Employee.findById(employeeId);

//         if (!user) {
//           return res.status(404).json({ error: 'User not found' });
//         }

//         const salary = user.monthlySalary;
//         const percentage = 0.3;   // 30% of monthlySalary
//         const maxAllowedReturnPerMonth = salary * percentage;   //maximum he can return in month < 30%
//         const maxLoanAmount = maxAllowedReturnPerMonth * 12;    //maximum he can laon
//         // Validate loan amount against maximum allowed loan amount
//         if (amount > maxLoanAmount) {
//           return res.status(400).json({ error: 'Loan amount exceeds maximum allowed' });
//         }

//         const repaymentAmountPerMonth = amount / duration;   /**la somme he will return monthly based
//                                                               *on amount and duration he coose */

//       //  Validate repayment amount per month against maximum allowed
//         if (repaymentAmountPerMonth > maxAllowedReturnPerMonth) {
//           return res.status(400).json({ error: 'Repayment amount per month exceeds maximum allowed' });
//         }
//        console.log(`We will retrieve ${repaymentAmountPerMonth} from your account for ${duration} months.`);

//     // // Create an array to store repayment amounts for each month
//     // const repaymentSchedule = [];
//     // for (let i = 1; i <= duration; i++) {
//     //   repaymentSchedule.push({
//     //     month: i,
//     //     repaymentAmount: repaymentAmountPerMonth,
//     //   });
//     // }

//   const result = {
//                 duration: duration,
//                 salary: salary,
//                 maxLoanAmount: maxLoanAmount,
//                 loanAmount: amount,
//                 message: "Maximum allowed repayment per month",
//                 maxAllowedRepaymentPerMonth: maxAllowedReturnPerMonth,
//                 repaymentPerMonth: repaymentAmountPerMonth,

//               };
//               res.status(200).json(result);

//          const request = new laonModel(req.body);
//          const savedRequest = await request.save();
//          const laonModelId = savedRequest._id;

//          //save result in loanRepayment collection:

//          const repmRequest = new laonRepayment({
//           duration: duration,
//           amount: repaymentAmountPerMonth,
//           loanId:savedRequest._id
//          });
//          const savedrepmRequest = await repmRequest.save();

//         // Respond with the saved request
//        // res.status(201).json(savedRequest);
//     } catch (error) {
//         // Check if the error is a duplicate key error (code 11000)
//         if (error.code === 11000) {
//             // Handle the duplicate key error
//             console.error('Duplicate key error:', error);
//             // Respond with an appropriate error message
//             res.status(400).json({ error: 'Duplicate key error: This request already exists' });
//         } else {
//             // Handle other types of errors
//             console.error('Error saving request:', error);
//             // Respond with a generic error message
//             res.status(500).json({ error: 'Internal server error' });
//         }
//     }
// };

// const createLaonRequest = async (req, res) => {
//       try {
//           const { employeeId, amount, duration ,purpose} = req.body;   //duration by default 12 months

//           // Retrieve user details from the database
//           const user = await Employee.findById(employeeId);

//           if (!user) {
//             return res.status(404).json({ error: 'User not found' });
//           }
//           const exist = await laonRepayment.find({}).populate({
//             path: 'loanId',
//             populate: {
//               path: 'employeeId',
//               match: { _id: employeeId } // Filter by the employeeId you're interested in
//             }
//           });
//           console.log("exist :",exist);

//         if (exist.length === 0) {
//             console.log("no past laon .... u can demande");
//         } else {
//             if (!exist.complete) {
//                 return res.status(400).json({ error: "ur past laon is not complete.... u can not demande" });
//             } else {
//                 console.log("ur past laon is complete.... u can demande");
//             }
//         }

//         // Other code for loan request

//         // res.status(200).json(result);

//           const salary = user.monthlySalary;
//           const durée = req.body.duration;
//           const percentage = 0.3;   // 30% of monthlySalary
//           const maxAllowedReturnPerMonth = salary * percentage;   //maximum he can return in month < 30%
//           const maxLoanAmount = maxAllowedReturnPerMonth * 12;    //maximum he can laon
//           // Validate loan amount against maximum allowed loan amount
//           if (amount > maxLoanAmount) {
//             return res.status(400).json({ error: 'Loan amount exceeds maximum allowed' });
//           }

//           const repaymentAmountPerMonth = amount / durée;   /**la somme he will return monthly based
//                                                                 *on amount and duration he coose */

//         //  Validate repayment amount per month against maximum allowed
//           if (repaymentAmountPerMonth > maxAllowedReturnPerMonth) {
//             return res.status(400).json({ error: 'Repayment amount per month exceeds maximum allowed' });
//           }
//          console.log(`We will retrieve ${repaymentAmountPerMonth} from your account for ${durée} months.`);

//     const result = {
//                   duration: durée,
//                   salary: salary,
//                   maxLoanAmount: maxLoanAmount,
//                   loanAmount: amount,
//                   maxAllowedRepaymentPerMonth: maxAllowedReturnPerMonth,
//                   repaymentPerMonth: repaymentAmountPerMonth,
//                   message: `We will retrieve ${repaymentAmountPerMonth} from your account for ${durée} months.`,
//                 };

//            const request = new laonModel(req.body);
//            const savedRequest = await request.save();
//            const laonModelId = savedRequest._id;

//            //save result in loanRepayment collection:

//            const repmRequest = new laonRepayment({
//             duration: duration,
//             amount: repaymentAmountPerMonth,
//             loanId:savedRequest._id
//            });
//            const savedrepmRequest = await repmRequest.save();

//            res.status(200).json(result);
//           // Respond with the saved request
//          // res.status(201).json(savedRequest);
//       } catch (error) {
//           // Check if the error is a duplicate key error (code 11000)
//           if (error.code === 11000) {
//               // Handle the duplicate key error
//               console.error('Duplicate key error:', error);
//               // Respond with an appropriate error message
//               res.status(400).json({ error: 'Duplicate key error: This request already exists' });
//           } else {
//               // Handle other types of errors
//               console.error('Error saving request:', error);
//               // Respond with a generic error message
//               res.status(500).json({ error: 'Internal server error' });
//           }
//       }
//   };

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

    const request = new laonModel(req.body);
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
module.exports = {
  createLaonRequest,
  getMyLaon,
  getallLaon,
  getLaon,
  suiviLaon,
  // getReq
};
