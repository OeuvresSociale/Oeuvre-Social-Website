const mongoose = require("mongoose");

const requestSchema = new mongoose.Schema({
  creationDate: {
    type: Date,
    default: Date.now,
    required: true,
  },
  requestTypeId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "typeRequest",
    required: true,
  },
  employeeId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "user",
    required: true,
  },
  answerDate: {
    type: Date,
  },
  state: {
    type: String,
    enum: ["En attente", "Approuvée", "Rejetée"],
    default: "En attente",
    required: true,
  },
  motif: {
    type: String,
    required: false,
  },
  amount: {
    required: false,
    type: Number,
  },
  files: [
    {
      fileName: String,
      fileOriginalName: String,
    },
  ],
});

const RequestModel = mongoose.model("Request", requestSchema);

module.exports = RequestModel;
