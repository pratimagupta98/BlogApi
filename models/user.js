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
    },
    status:{
      type: String,
      default:"Active"
    },
    meteors:{
      type: Number,
      default:0  
  },
  rating_meteros:{
    type:Number,
    default:0
  },
  review_meteros:{
    type:Number,
    default:0
  }

  },



  { timestamps: true }
);


module.exports = mongoose.model("user", thisSchema);
