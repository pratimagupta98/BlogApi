const mongoose = require("mongoose");
const Schema = mongoose.Schema;
const thisSchema = new Schema(
  {

    username: {
      type: String,
    },
    email: {
      type: String,
    },
    mobile: {
      type: Number
    },
    password: {
      type: String,
    },
    

  },



  { timestamps: true }
);


module.exports = mongoose.model("user", thisSchema);
