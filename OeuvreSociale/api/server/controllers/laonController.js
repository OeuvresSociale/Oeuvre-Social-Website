const Employee = require("../models/user");
const laonModel= require('../models/Laon');

/**
 * to test : 
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
    
    

module.exports={createLaonRequest};

  