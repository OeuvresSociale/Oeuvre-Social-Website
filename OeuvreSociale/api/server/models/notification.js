const mongoose = require("mongoose");

const schema = mongoose.Schema;

const notificationSchema = new schema({
  title: {
    type: String,
    required: true,
  },
  message: {
    type: String,
    required: true,
  },
  employeeId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "user",
    required: true,
  },
  creationDate: {
    type: Date,
    default: Date.now,
    required: true,
  },
  readStatus:{
    type:Boolean,
    default:false
  }

});

const notification = mongoose.model("notification", notificationSchema);

module.exports = notification;
