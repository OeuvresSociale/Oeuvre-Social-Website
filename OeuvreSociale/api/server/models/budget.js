const mongoose = require("mongoose");

const schema = mongoose.Schema;

const budgetSchema = new schema({
  initialAmount: {
    type: Number,
    required: true,
  },

  history: [
    {
      amount: {
        type: Number,
        required: true,
      },
      updatedDate: {
        type: Date,
        default: Date.now,
      },
    },
  ],
});

const Budget = mongoose.model("Budget", budgetSchema);

module.exports = Budget;
