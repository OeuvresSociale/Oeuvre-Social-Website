const Request = require("../models/request.js");
const Offre = require("../models/offres.js");
const laonRepayment = require("../models/loanRepaymen.js");
const Laon = require("../models/Laon.js");
const transaction = require("../models/transaction.js");
const cron = require("node-cron");
const Budget = require("../models/budget.js");
const path = require("path");   
const fs = require("fs");
const { updateBudget } = require("./budgetController.js");

// valide the request
const validRequest = async (req, res) => {
  try {
    // Find the request by ID and update its validated to true
    const updatedRequest = await Request.findByIdAndUpdate(
      req.params.id,
      { validated: true },
      { new: true }
    )
      .populate({
        path: "employeeId",
        model: "user",
        select: "firstName familyName",
      })
      .populate({
        path: "requestTypeId",
        model: "typeRequest",
        select: "amount",
      });
    if (!updatedRequest) {
      return res.status(404).json({ error: "Request not found" });
    }

    // Create a new outcome object with the updated request's data
    const newOutcome = new transaction({
      // requestId: updatedRequest._id,
      name:
        updatedRequest.employeeId.firstName +
        " " +
        updatedRequest.employeeId.familyName,
      Amount: updatedRequest.requestTypeId.amount,
      categorie: "outcome",
      type: "demande",
      files: req.files.map((file) => ({
        fileName: file.filename, // Use the filename as fileId
        fileOriginalName: file.originalname,
      })),
    });
    await newOutcome.save();
    //updating budget
    updateBudget(newOutcome);

    // Send success response
    return res
      .status(200)
      .json({ message: "Request updated and moved successfully" });
  } catch (error) {
    console.error("Error updating and moving request:", error);
    return res.status(500).json({ error: "Internal server error" });
  }
};
// valude loan
const validLaon = async (req, res) => {
  try {
    // Find the request by ID and update its validated to true
    const updatedRequest = await Laon.findByIdAndUpdate(
      req.params.id,
      { validated: true },
      { new: true }
    ).populate({
      path: "employeeId",
      model: "user",
      select: "firstName familyName",
    });

    if (!updatedRequest) {
      return res.status(404).json({ error: "Request not found" });
    }

    // Create a new outcome object with the updated request's data
    const newRepayment = new laonRepayment({
      amount :updatedRequest.amount,
      duration:updatedRequest.duration,
    });
    const newOutcome = new transaction({
      // requestId: updatedRequest._id,
      name:
        updatedRequest.employeeId.firstName +
        " " +
        updatedRequest.employeeId.familyName,
      Amount: updatedRequest.amount,
      categorie: "outcome",
      type: "loan",
      files: req.files.map((file) => ({
        fileName: file.filename, // Use the filename as fileId
        fileOriginalName: file.originalname,
      })),
    });
    await newOutcome.save();
    //updating budget
    updateBudget(newOutcome);
    // Send success response
    return res
      .status(200)
      .json({ message: "Request updated and moved successfully" });
  } catch (error) {
    console.error("Error updating and moving request:", error);
    return res.status(500).json({ error: "Internal server error" });
  }
};
// get one trnsaction
const getValid = async (req, res) => {
  try {
    const request = await transaction.findById(req.params.id);

    res.status(200).json(request);
  } catch (err) {
    // Handle errors
    res.status(500).json(err);
  }
};
// get all trnsaction
const getValids = async (req, res) => {
  const page = req.query.page || 1;
  const RequestPerPage = 10;
  const skipRequests = (page - 1) * RequestPerPage;
  try {
    const request = await transaction
      .find() //findById(req.params.id)
      .sort({ creationDate: -1 })
      .skip(skipRequests)
      .limit(RequestPerPage);
    res.status(200).json(request);
  } catch (err) {
    // Handle errors
    res.status(500).json(err);
  }
};
// create transaction de type : offre ou others
const addTransaction = async (req, res) => {
  try {
    const data = new transaction({
      name: req.body.name,
      creationDate: new Date(),
      title: req.body.title,
      type: req.body.type,
      Amount: req.body.Amount,
      categorie: req.body.categorie,
      files: req.files.map((file) => ({
        fileName: file.filename, // Use the filename as fileId
        fileOriginalName: file.originalname,
      })),
    });
    const saveData = await data.save();
    //updating budget
    updateBudget(saveData);
    res.status(201).json(saveData);
  } catch (error) {
    console.error("Error creating transaction:", error);
    res.status(500).json({ error: "Internal server error" });
  }
};
// create transaction de type : offre ou others
const processRepaymentsMonthly = async (req, res) => {
  try {
    // Get all repayment loans due this month
    const currentDate = new Date();
    const repayments = await laonRepayment.find({
      complete: false, // Only get incomplete repayments
    });

    // Process each repayment
    for (const repayment of repayments) {
      // Check if corresponding loan exists
      const loan = await Laon.findById(repayment.loanId).populate({
        path: "employeeId",
        model: "user",
        select: "firstName familyName",
      });

      if (!loan) {
        console.log(
          `Corresponding loan not found for repayment ${repayment._id}`
        );
        continue; // Skip this repayment if corresponding loan not found
      }
      if (!loan.validated) {
        console.log(`Corresponding loan is not yet validated ${repayment._id}`);
        continue; // Skip this repayment if corresponding loan not valid
      }

      // Create transaction for valid repayment
      const newTransaction = new transaction({
        name: loan.employeeId.firstName + " " + loan.employeeId.familyName,
        title: repayment.title,
        type: "Repayment",
        Amount: repayment.amount,
        categorie: "income",
      });
      const savedTransaction = await newTransaction.save();
      //updating budget
      updateBudget(savedTransaction);
      // Update loan duration and completion status
      repayment.duration -= 1; // Decrement duration
      if (repayment.duration <= 0) {
        repayment.complete = true; // Set complete to true if duration is zero or negative
      }

      await repayment.save();
    }
    console.log("Repayments processed successfully");
    res.status(200).json({ message: "Repayments processed successfully" });
  } catch (error) {
    console.error("Error processing repayments:", error);
    res.status(500).json({ error: "Internal server error" });
  }
};

// update transaction
const updateTransaction = async (req, res) => {
  try {
    const updatedRequest = await transaction.findByIdAndUpdate(
      req.params.id,
      { $set: req.body },
      { new: true }
    );
    if (!updatedRequest) {
      return res.status(404).json({ error: "Request not found" });
    }
    // Send success response
    return res
      .status(200)
      .json({ message: "Request updated and moved successfully" });
  } catch (error) {
    console.error("Error updating request:", error);
    return res.status(500).json({ error: "Internal server error" });
  }
};
// deleyte transaction
const deleteTransaction = async (req, res) => {
  const existingTransaction = await transaction.findById(req.params.id);
  if (!existingTransaction) {
    res.status(401).json("this transaction not existed");
  } else {
    try {
      await transaction.findByIdAndDelete(req.params.id);
      res.status(200).json("transaction has been deleted");
    } catch (err) {
      res.status(500).json(err);
    }
  }
};

//function to display the files
const uploadsDir = path.join(__dirname, "../uploads");
async function getFileById(req, res) {
  const transactionId = req.params.transactionId;
  const fileId = req.params.fileId;
  console.log(fileId);
  try {
    // Retrieve the request document from the database
    const Transaction = await transaction.findById(transactionId);
    if (!Transaction) {
      return res.status(404).send("transaction not found");
    }

    // Access files directly from the transaction object
    const foundFile = Transaction.files.find(
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

// calculate total income,percentage income transactions, and the number of income transactions
const calculateIncomeSummary = async (req, res) => {
  try {
    const incomes = await transaction.aggregate([
      { $match: { categorie: "income" } },
      {
        $group: {
          _id: null,
          totalIncome: { $sum: "$Amount" },
          count: { $sum: 1 },
        },
      }, // Calculate total income and count of income transactions
    ]);
    const totalTransactions = await transaction.aggregate([
      { $group: { _id: null, totalCount: { $sum: 1 } } }, // Calculate total count of all transactions
    ]);

    const totalIncome = incomes.length > 0 ? incomes[0].totalIncome : 0;
    const incomeCount = incomes.length > 0 ? incomes[0].count : 0;
    const totalCount =
      totalTransactions.length > 0 ? totalTransactions[0].totalCount : 0;
    // Calculate income percentage
    const incomePercentage = (incomeCount / totalCount) * 100;
    res.status(200).json({
      totalIncome,
      incomeCount,
      incomePercentage,
    });
  } catch (error) {
    console.error("Error calculating income summary:", error);
    res.status(500).json({ error: "Internal Server Error" });
  }
};

//  calculate total outcome,  percentage , and the number of outcome transactions
const calculateOutcomeSummary = async (req, res) => {
  try {
    const outcomes = await transaction.aggregate([
      { $match: { categorie: "outcome" } },
      {
        $group: {
          _id: null,
          totalOutcome: { $sum: "$Amount" },
          count: { $sum: 1 },
        },
      }, // Calculate total outcome and count of outcome transactions
    ]);

    const totalTransactions = await transaction.aggregate([
      { $group: { _id: null, totalCount: { $sum: 1 } } }, // Calculate total count of all transactions
    ]);

    const totalOutcome = outcomes.length > 0 ? outcomes[0].totalOutcome : 0;
    const outcomeCount = outcomes.length > 0 ? outcomes[0].count : 0;
    const totalCount =
      totalTransactions.length > 0 ? totalTransactions[0].totalCount : 0;

    // Calculate outcome percentage
    const outcomePercentage = (outcomeCount / totalCount) * 100;

    res.status(200).json({
      totalOutcome,
      outcomeCount,
      outcomePercentage,
    });
  } catch (error) {
    console.error("Error calculating outcome summary:", error);
    res.status(500).json({ error: "Internal Server Error" });
  }
};
// Schedule the function to run monthly
//cron.schedule('0 0 1 * *', processRepaymentsMonthly); // At 00:00 on the 1st day of every month

module.exports = {
  validRequest,
  getValid,
  validLaon,
  addTransaction,
  getValids,
  updateTransaction,
  deleteTransaction,
  processRepaymentsMonthly,
  getFileById,
  calculateIncomeSummary,
  calculateOutcomeSummary,
};
