const Employee = require("../models/user");
const laonModel= require('../models/Laon');


//Get all request for employee
const getMyLaon = async (req, res) => {
  //current page
  const page = req.query.page || 1;
  const RequestsPerPage = 10;
  const skipRequests = (page - 1) * RequestsPerPage;
  const filtre = req.query.filtre || "";
  try {
    const Requests = await laonModel.find(
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
  //current page
  const page = req.query.page || 1;
  const RequestPerPage = 10;
  const skipRequests = (page - 1) * RequestPerPage;
  const filter = req.query.filter || "";
  try {
    const Requests = await laonModel
   
    .find(
      {
        $or: [{ state: { $regex: filter } }],
      },
      { creationDate: 1, state: 1, motif: 1 }
    )
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
const getLaon = async (req, res) => {
  try {
    const request = await laonModel.findById(req.params.id, { files: 1 })
      .populate(
        "employeeId",
        "idEmployee familyName firstName dateStartJob email phoneNumber"
      );
      
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
    const createLaonRequest = async (req, res) => {
        try {
            const { employeeId, amount, duration } = req.body;   //duration by default 12 months
          
            // Retrieve user details from the database
            const user = await Employee.findById(employeeId);
            
            if (!user) {
              return res.status(404).json({ error: 'User not found' });
            }
          
            const salary = user.monthlySalary;
            const percentage = 0.3;   // 30% of monthlySalary
            const maxAllowedReturnPerMonth = salary * percentage;   //maximum he can return in month < 30%
            const maxLoanAmount = maxAllowedReturnPerMonth * 12;    //maximum he can laon 
            // Validate loan amount against maximum allowed loan amount
            if (amount > maxLoanAmount) {
              return res.status(400).json({ error: 'Loan amount exceeds maximum allowed' });
            }
          
            const repaymentAmountPerMonth = amount / duration;   /**la somme he will return monthly based 
                                                                  *on amount and duration he coose */
          

          //  Validate repayment amount per month against maximum allowed
            if (repaymentAmountPerMonth > maxAllowedReturnPerMonth) {
              return res.status(400).json({ error: 'Repayment amount per month exceeds maximum allowed' });
            }
           console.log(`We will retrieve ${repaymentAmountPerMonth} from your account for ${duration} months.`);
        
        // // Create an array to store repayment amounts for each month
        // const repaymentSchedule = [];
        // for (let i = 1; i <= duration; i++) {
        //   repaymentSchedule.push({
        //     month: i,
        //     repaymentAmount: repaymentAmountPerMonth,
        //   });
        // }

      const result = {
                    duration: duration,
                    salary: salary,
                    maxLoanAmount: maxLoanAmount,
                    loanAmount: amount,
                    message: "Maximum allowed repayment per month",
                    maxAllowedRepaymentPerMonth: maxAllowedReturnPerMonth,
                    repaymentPerMonth: repaymentAmountPerMonth,
                             
                  };               
                  res.status(200).json(result);

             const request = new laonModel(req.body);
             const savedRequest = await request.save();
            
            // Respond with the saved request
           // res.status(201).json(savedRequest);
        } catch (error) {
            // Check if the error is a duplicate key error (code 11000)
            if (error.code === 11000) {
                // Handle the duplicate key error
                console.error('Duplicate key error:', error);
                // Respond with an appropriate error message
                res.status(400).json({ error: 'Duplicate key error: This request already exists' });
            } else {
                // Handle other types of errors
                console.error('Error saving request:', error);
                // Respond with a generic error message
                res.status(500).json({ error: 'Internal server error' });
            }
        }
    };
    
    

module.exports={
  createLaonRequest,
  getMyLaon, 
  getallLaon,
  getLaon,
  suiviLaon
};

  