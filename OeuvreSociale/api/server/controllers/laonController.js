const Employee = require("../models/user");
const laonModel= require('../models/Laon');
const laonRepayment = require('../models/loanRepaymen');
 
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
      const notification = new Notify({
        employeeId: updatedRequest.employeeId,
        type: 'new_message',
        message: 'Your Laon request has been answed',
        timestamp: new Date(),
        readStatus: false
      });
      
      // Save the notification to the database
      notification.save()
        .then(savedNotification => {
          console.log('Notification saved successfully:', savedNotification);
        })
        .catch(error => {
          console.error('Error saving notification:', error);
        });
    } catch (error) {
      console.error(error);
      res.status(500).json({ error: "Internal server error" });
    }
  } catch {
    res.status(401).json("this request is not existed");
  }
};


///create laon request by employee

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
            const { employeeId, amount, duration ,purpose} = req.body;   //duration by default 12 months
          
            // Retrieve user details from the database
            const user = await Employee.findById(employeeId);
            
            if (!user) {
              return res.status(404).json({ error: 'User not found' });
            }
            const exist = await laonRepayment.find({}).populate({
              path: 'loanId',
              populate: {
                path: 'employeeId',
                match: { _id: employeeId } // Filter by the employeeId you're interested in
              }
            });       
           console.log(exist);
               
        
           if (exist.length === 0) {
            console.log("No past loan .... You can request a loan");
        } else {
            const pastLoan = exist[0]; // Assuming you want to work with the first past loan if multiple exist
            if (!pastLoan.complete) {
                return res.status(400).json({ error:  "Your past loan is not complete.... "});
            } else {
                console.log("Your past loan is complete.... You can request a new loan");
                // try {
                //     // Delete the past loan from the database
                //     await laonRepayment.findByIdAndDelete(pastLoan._id);
                //     console.log("Past loan deleted from the database");
                // } catch (error) {
                //     console.error("Error deleting past loan:", error);
                //     return res.status(500).json({ error: "Internal Server Error" });
                // }
            }
        }
        
         
            const salary = user.monthlySalary;
            const durée = req.body.duration;
            const percentage = 0.3;   // 30% of monthlySalary
            const maxAllowedReturnPerMonth = salary * percentage;   //maximum he can return in month < 30%
            const maxLoanAmount = maxAllowedReturnPerMonth * 12;    //maximum he can laon 
            // Validate loan amount against maximum allowed loan amount
            if (amount > maxLoanAmount) {
              return res.status(400).json({ error: 'Loan amount exceeds maximum allowed' });
            }
          
            const repaymentAmountPerMonth = amount / durée;   /**la somme he will return monthly based 
                                                                  *on amount and duration he coose */
          

          //  Validate repayment amount per month against maximum allowed
            if (repaymentAmountPerMonth > maxAllowedReturnPerMonth) {
              return res.status(400).json({ error: 'Repayment amount per month exceeds maximum allowed' });
            }
           console.log(`We will retrieve ${repaymentAmountPerMonth} from your account for ${durée} months.`);
        
        // // Create an array to store repayment amounts for each month
        // const repaymentSchedule = [];
        // for (let i = 1; i <= duration; i++) {
        //   repaymentSchedule.push({
        //     month: i,
        //     repaymentAmount: repaymentAmountPerMonth,
        //   });
        // }

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
             const savedRequest = await request.save();
             const laonModelId = savedRequest._id;
             
             //save result in loanRepayment collection:

             const repmRequest = new laonRepayment({
              duration: duration,
              amount: repaymentAmountPerMonth,
              loanId:savedRequest._id
             });
             const savedrepmRequest = await repmRequest.save();

             res.status(200).json(result);
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

  