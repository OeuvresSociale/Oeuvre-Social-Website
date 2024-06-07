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
const notify = require("../models/notification.js");

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
      creationDate: Date.now(), 
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
      select: "employeeId firstName familyName",
    });

    if (!updatedRequest) {
      return res.status(404).json({ error: "Request not found" });
    }

    // Create a new outcome object with the updated request's data
    const newRepayment = new laonRepayment({
      amount: updatedRequest.amount,
      duration: updatedRequest.duration,
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

     //notification  
     const notification = new notify({
      employeeId: updatedRequest.employeeId,
      title: "demande de pret",
      message: `We will retrieve ${updatedRequest.reimburse} from your account for ${updatedRequest.duration} months.`,
    });

    await notification.save();
    
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
  // const page = req.query.page || 1; 
  // const RequestPerPage = 10;
  // const skipRequests = (page - 1) * RequestPerPage;
  try {
    const request = await transaction
      .find() //findById(req.params.id)
      .sort({ creationDate: -1 })
      // .skip(skipRequests)
      // .limit(RequestPerPage);
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
      creationDate: req.body.creationDate,
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
const calculateTransactionSummaryByType = async (req, res) => {
  try {
    const totalTransactions = await transaction.countDocuments();

    const transactionsByType = await transaction.aggregate([
      {
        $group: {
          _id: "$type",
          count: { $sum: 1 },
        },
      },
      {
        $project: {
          _id: 0,
          type: "$_id",
          count: 1,
          percentage: {
            $multiply: [{ $divide: ["$count", totalTransactions] }, 100],
          },
        },
      },
    ]);

    res.status(200).json(transactionsByType);
  } catch (error) {
    console.error("Error calculating transaction summary by type:", error);
    res.status(500).json({ error: "Internal Server Error" });
  }
};
///////////////////////////////////////////////////////////////////////
const getLineChartData = async (req, res) => {
  try {
    const transactions = await transaction.find({});
    const seriesData = {
      Demandes: [],
      Prets: [],
      Offres: [],
    };

    transactions.forEach((transaction) => {
      if (transaction.type === "demande") {
        seriesData.Demandes.push(transaction.value);
      } else if (transaction.type === "prete") {
        seriesData.Prets.push(transaction.value);
      } else if (transaction.type === "offre") {
        seriesData.Offres.push(transaction.value);
      }
    });

    res.status(200).json(seriesData);
  } catch (error) {
    console.error("Error fetching line chart data:", error);
    res.status(500).json({ error: "Internal Server Error" });
  }
};
////////////////////////////////////////////////////////////////////////////////////////////////////////////////
const calculateCashFlows = async (startDate, endDate) => {
  try {
    const transactions = await transaction.find({
      creationDate: { $gte: startDate, $lte: endDate }, // Filtrer les transactions entre les dates spécifiées
    });

    // Initialiser les flux de trésorerie
    const cashFlows = { income: [], expense: [] }; // Initialize income and expense as arrays

    // Parcourir les transactions et les ajouter aux flux de trésorerie appropriés
    transactions.forEach((transaction) => {
      const type = transaction.categorie === "income" ? "income" : "expense";

      // Rechercher l'indice de la transaction dans le tableau correspondant
      const index = cashFlows[type].findIndex(
        (item) => item.type === transaction.type
      );

      // Si la transaction existe déjà, mettre à jour les totaux
      if (index !== -1) {
        cashFlows[type][index].totalAmount += transaction.Amount;
        cashFlows[type][index].totalCount++;
      } else {
        // Si la transaction n'existe pas, l'ajouter au tableau
        cashFlows[type].push({
          type: transaction.type,
          totalAmount: transaction.Amount,
          totalCount: 1,
        });
      }
    });

    return cashFlows;
  } catch (error) {
    throw new Error("Erreur lors du calcul des flux de trésorerie :", error);
  }
};

///////////////////////////////////////////////////////////////////////////////////////////////////////////////
const calculateOfferTransactions = async (startDate, endDate) => {
  try {
    const start = new Date(startDate);
    const end = new Date(endDate);

    // Calculer le nombre de transactions de type "offre" dans l'intervalle de dates spécifié
    const offerTransactionsCount = await transaction.countDocuments({
      type: "offre",
      creationDate: { $gte: start, $lte: end },
    });

    return offerTransactionsCount;
  } catch (error) {
    throw new Error(
      "Erreur lors du calcul du nombre de transactions d'offre :",
      error
    );
  }
};
//////////////////////////////////////////////////////////////////////////////////////////////////////////////
const PDFDocument = require("pdfkit");

const createbilan = async (req, res) => {
  // const { startDate, endDate } = req.body;

  // if ( !startDate || !endDate ) {
  //   return res.status(400).send("Invalid request body");
  // }

  // // Convertir les dates de début et de fin en objets Date
  // const start = new Date(startDate);
  // const end = new Date(endDate);
  const start = new Date("2024-01-01");
  const end = new Date("2024-06-10");

  const schoolLogoPath = path.join(__dirname, "../src", "esilogo.png");
  const companyLogoPath = path.join(__dirname, "../src", "logo.png");

  // Calculer les flux de trésorerie
  const cashFlows = await calculateCashFlows(start, end);
  const activities = {
    // offers: await calculateOfferTransactions(start, end),
    offers: 20,
    meetings: 5,
  };
  const fileName = "bilan.pdf";
  // Vérifier la validité des dates
  if (isNaN(start.getTime()) || isNaN(end.getTime())) {
    return res.status(400).send("Invalid date format");
  }

  // Crée un nouveau document PDF
  const doc = new PDFDocument();
  const uniqueFilename = `${Date.now()}-${fileName}.pdf`;
  const filePath = path.join(__dirname, "../uploads", uniqueFilename);

  // Utiliser une promesse pour gérer l'écriture du fichier PDF
  const writeStream = fs.createWriteStream(filePath);

  return new Promise((resolve, reject) => {
    doc.pipe(writeStream);

    // Insérer les logos de l'école et de l'entreprise
    doc.image(schoolLogoPath, { width: 70, align: "left" });
    doc.moveUp();
    //doc.image(companyLogoPath, { width: 70, align: "right" });
    doc.moveDown();
    doc.moveDown();
    doc.moveDown();
    doc.moveDown();
    doc.moveDown();
    doc.moveDown();
    doc.moveDown();
    // Fonction pour centrer le texte
    function centerText(doc, text, fontSize) {
      const pageWidth = doc.page.width;
      const textWidth = doc.widthOfString(text, { size: fontSize });
      const x = (pageWidth - textWidth) / 2;
      doc.text(text, x, doc.y);
    }

    // Titre du document
    doc.font("Helvetica");
    doc.fontSize(20);
    centerText(doc, "Bilan", 20);
    doc.moveDown();

    // Période du bilan
    doc.fontSize(14);
    centerText(
      doc,
      `Bilan du ${start.toDateString()} au ${end.toDateString()}`,
      14
    );
    doc.moveDown();

    // Tableau de flux de trésorerie
    doc.fontSize(16);
    centerText(doc, "Tableau de flux de trésorerie", 16);
    doc.moveDown();

    // Encaissements
    doc.fontSize(14);
    centerText(doc, "Encaissements", 14);
    doc.moveDown();

    // Créer un tableau pour les encaissements
    const incomeTable = [
      ["Type de transaction", "Nombre de transactions", "Montant total"],
      ...cashFlows.income.map((transaction) => [
        transaction.type,
        transaction.totalCount,
        transaction.totalAmount,
      ]),
    ];

    // Calculer la somme totale des montants des encaissements
    const totalIncomeAmount = cashFlows.income.reduce(
      (acc, transaction) => acc + transaction.totalAmount,
      0
    );

    drawTable(doc, incomeTable, {
      startY: doc.y,
      columnWidth: 150,
      rowHeight: 20,
      padding: 5,
    });
    doc.moveDown();
    // Afficher la somme totale des encaissements
    doc.text(`Somme totale des encaissements: ${totalIncomeAmount} DA`, {
      align: "left",
    });

    // Décaissements

    doc.moveDown();
    doc.fontSize(14);
    centerText(doc, "Décaissements", 14);
    doc.moveDown();

    // Créer un tableau pour les décaissements
    const expenseTable = [
      ["Type de transaction", "Nombre de transactions", "Montant total"],
      ...cashFlows.expense.map((transaction) => [
        transaction.type,
        transaction.totalCount,
        transaction.totalAmount,
      ]),
    ];

    // Calculer la somme totale des montants des décaissements
    const totalExpenseAmount = cashFlows.expense.reduce(
      (acc, transaction) => acc + transaction.totalAmount,
      0
    );

    drawTable(doc, expenseTable, {
      startY: doc.y,
      columnWidth: 150,
      rowHeight: 20,
      padding: 5,
    });
    doc.moveDown();
    // Afficher la somme totale des décaissements
    doc.text(`Somme totale des décaissements: ${totalExpenseAmount} DA`, {
      align: "left",
    });

    // Définir la fonction drawTable
    function drawTable(doc, data, options) {
      const { startY, columnWidth, rowHeight, padding } = options;
      const tableWidth = data[0].length * columnWidth;
      const pageWidth = doc.page.width;
      const startX = (pageWidth - tableWidth) / 2;

      // Définir la taille de la police et de la colonne
      doc.fontSize(12);

      // Dessiner les cellules avec du padding
      for (let i = 0; i < data.length; i++) {
        for (let j = 0; j < data[i].length; j++) {
          doc.text(
            data[i][j],
            startX + j * columnWidth + padding,
            startY + i * rowHeight + padding,
            {
              width: columnWidth - padding * 2,
              height: rowHeight - padding * 2,
            }
          );
        }
      }

      // Dessiner les lignes horizontales
      for (let i = 0; i <= data.length; i++) {
        doc
          .moveTo(startX, startY + i * rowHeight)
          .lineTo(startX + tableWidth, startY + i * rowHeight)
          .stroke();
      }

      // Dessiner les lignes verticales
      for (let j = 0; j <= data[0].length; j++) {
        doc
          .moveTo(startX + j * columnWidth, startY)
          .lineTo(startX + j * columnWidth, startY + rowHeight * data.length)
          .stroke();
      }
    }

    // Section Activités
    doc.moveDown();
    doc.moveDown();
    doc.fontSize(16);
    centerText(doc, "Activités", 16);
    doc.moveDown();

    // Aligné à gauche (au bord de la page)
    const leftMargin = 75; // Define a left margin for the text to align to the left edge
    doc.fontSize(14);
    doc.text(`Nombre d'offres: ${activities.offers}`, leftMargin, doc.y);
    doc.moveDown();
    doc.text(`Nombre de réunions: ${activities.meetings}`, leftMargin, doc.y);
    doc.moveDown();

    // Ajouter un espace après la section
    doc.moveDown();

    // Finaliser le document PDF
    doc.end();
    writeStream.on("finish", () => {
      resolve();
    });

    writeStream.on("error", (err) => {
      reject(err);
    });
  })
    .then(() => {
      if (!fs.existsSync(filePath)) {
        return res.status(404).send("File not found");
      }
      // Serve the file
      
      res.sendFile(filePath);
    })
    .catch((err) => {
      console.error("Error generating the PDF:", err);
      res.status(500).send("Error generating the PDF");
    });
};

//////////////////////////////////////////////////////////////
// const calculateMonthlyOutcome = async (req, res) => {
//   try {
//     const outcomes = await transaction.aggregate([
//       {
//         $match: {
//           categorie: "outcome",
//           createdAt: {
//             $gte: new Date(new Date().getFullYear(), new Date().getMonth(), 1),
//             $lt: new Date(new Date().getFullYear(), new Date().getMonth() + 1, 1),
//           },
//         },
//       },
//       {
//         $group: {
//           _id: null,
//           totalOutcome: { $sum: "$Amount" },
//         },
//       },
//     ]);

//     const totalOutcome = outcomes.length > 0 ? outcomes[0].totalOutcome : 0;

//     res.status(200).json({
//       totalOutcome,
//     });
//   } catch (error) {
//     console.error("Error calculating monthly outcome:", error);
//     res.status(500).json({ error: "Internal Server Error" });
//   }
// };
   

const calculateAllMonthlyOutcome = async (req, res) => {
  try {
    const allMonths = Array.from({ length: 12 }, (_, i) => i + 1); // Generate an array of numbers from 1 to 12 representing months

    const monthlyOutcomes = await transaction.aggregate([
      {
        $match: {
          categorie: "outcome",
          creationDate: {
            $gte: new Date(new Date().getFullYear(), 0, 1), // Start of the year
            $lt: new Date(new Date().getFullYear() + 1, 0, 1) // Start of next year
          },
        },
      },
      {
        $group: {
          _id: { $month: "$creationDate" },
          totalOutcome: { $sum: "$Amount" },
          count: { $sum: 1 },
        },
      },
    ]);

    // Merge the monthly outcome data with the list of all months
    const mergedData = allMonths.map(month => {
      const monthData = monthlyOutcomes.find(item => item._id === month);
      return {
        month,
        totalOutcome: monthData ? monthData.totalOutcome : 0,
        count: monthData ? monthData.count : 0
      };
    });

    res.status(200).json(mergedData);
  } catch (error) {
    console.error("Error calculating monthly outcome:", error);
    res.status(500).json({ error: "Internal Server Error" });
  }
};
const calculateAllMonthlyIncome = async (req, res) => {
  try {
    const allMonths = Array.from({ length: 12 }, (_, i) => i + 1); // Generate an array of numbers from 1 to 12 representing months

    const monthlyIncomes = await transaction.aggregate([
      {
        $match: {
          categorie: "income",
          creationDate: {
            $gte: new Date(new Date().getFullYear(), 0, 1), // Start of the year
            $lt: new Date(new Date().getFullYear() + 1, 0, 1) // Start of next year
          },
        },
      },
      {
        $group: {
          _id: { $month: "$creationDate" },
          totalIncome: { $sum: "$Amount" },
          count: { $sum: 1 },
        },
      },
    ]);

    // Merge the monthly income data with the list of all months
    const mergedData = allMonths.map(month => {
      const monthData = monthlyIncomes.find(item => item._id === month);
      return {
        month,
        totalIncome: monthData ? monthData.totalIncome : 0,
        count: monthData ? monthData.count : 0
      };
    });

    res.status(200).json(mergedData);
  } catch (error) {
    console.error("Error calculating monthly income:", error);
    res.status(500).json({ error: "Internal Server Error" });
  }
};





module.exports = {
  createbilan,
  getLineChartData,
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
  calculateTransactionSummaryByType,
  calculateAllMonthlyOutcome,
  calculateAllMonthlyIncome
};
