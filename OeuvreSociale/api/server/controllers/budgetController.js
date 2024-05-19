const Budget = require("../models/budget");

// Function to initialize the Budget
const initializeBudget = async (req, res) => {
  try {
    const { initialAmount } = req.body;
    // Delete all documents from the "budget" collection
    const deletionResult = await Budget.deleteMany();
    // Create an initial history entry with the initial amount
    const initialHistoryEntry = {
      amount: initialAmount,
      updatedDate: new Date(),
    };

    const budget = new Budget({
      initialAmount: initialAmount,
      history: [initialHistoryEntry],
    });

    const savedBudget = await budget.save();
    console.log("Budget initialized successfully:", savedBudget);
    res.status(200).json(savedBudget);
  } catch (error) {
    console.error("Error initializing budget:", error);
    res.status(500).json({ error: "Failed to initialize budget" });
  }
};
//function to get the current amount
const getCurrentAmount = async (req, res) => {
  try {
    const budget = await Budget.findOne();
    if (!budget) {
      return res.status(404).json({ error: "Budget not found" });
    }
    let currentAmount = budget.initialAmount;
    if (budget.history.length > 0) {
      const latestHistoryEntry = budget.history[budget.history.length - 1];
      currentAmount = latestHistoryEntry.amount;
    }

    return res.json({ currentAmount });
  } catch (err) {
    console.error(err);
    return res.status(500).json({ error: "Internal Server Error" });
  }
};

//budget updating
async function updateBudget(transaction) {
  try {
    let budget = await Budget.findOne();

    if (!budget) {
      console.error("Budget not found!");
      return;
    }

    // Calculate the current amount based on the latest amount in the history
    let currentAmount = budget.initialAmount;
    if (budget.history.length > 0) {
      // Get the latest history entry
      const latestHistoryEntry = budget.history[budget.history.length - 1];
      currentAmount = latestHistoryEntry.amount;
    }

    // the current amount based on the transaction category
    if (transaction.categorie === "income") {
      currentAmount += transaction.Amount;
    } else if (transaction.categorie === "outcome") {
      currentAmount -= transaction.Amount;
    } else {
      console.error("Invalid transaction category!");
      return;
    }

    // Add the current amount to the budget history
    budget.history.push({
      amount: currentAmount,
      updatedDate: transaction.creationDate,
    });

    await budget.save();

    console.log("Budget updated successfully!");
  } catch (error) {
    console.error("Error updating budget:", error);
  }
}

// const statistics (req,res)=>{

// }
module.exports = {
  initializeBudget,
  getCurrentAmount,
  updateBudget,
};
