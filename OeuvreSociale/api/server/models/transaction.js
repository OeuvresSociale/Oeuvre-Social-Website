const mongoose = require("mongoose");

const schema = mongoose.Schema;

const transactionSchema = new schema({
  id: {
    type: Number,
    // Remove this field from here
  },
  name: {
    type: String,
  },
  title: {
    type: String,
  },
  type: {
    type: String,
    enum: ["demande", "laon", "annoce", "Repayment", "autre"],

  },
  categorie: {
    type: String,
    enum: ["income", "outcome"],
  },
  Amount: {
    type: Number,
  },
  creationDate: {
    type: Date,
    default: Date.now,
  },

  files: [ 
    {
      fileName: String,
      fileOriginalName: String,
    },
  ],

//   files: {
//     type: [
//       {
//         fileName: String,
//         fileOriginalName: String,
//       },
//     ],
//   },

});
//   requestId: {
//     type: mongoose.Schema.Types.ObjectId,
//     ref: "request",
//     // required: true
//   },

const transaction = mongoose.model("transaction", transactionSchema);

module.exports = transaction;
