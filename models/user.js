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
    display_name:{
      type: String,
    },
    abt_us:{
      type: String,
    },
    profileImg:{
      type :Array
    }
    

  },



  { timestamps: true }
);


module.exports = mongoose.model("user", thisSchema);
