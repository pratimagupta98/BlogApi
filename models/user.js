const mongoose = require("mongoose");
const Schema = mongoose.Schema;
const thisSchema = new Schema(
  {

    username: {
      type: String,
      required:true
    },
    email: {
      type: String,
      required:true
    },
    mobile: {
      type: Number,
      required:true
    },
    password: {
      type: String,
      required:true
    },
    display_name:{
      type: String,
    },
    abt_us:{
      type: String,
    },
    profileImg:{
      type :Array,
      default:
        "https://cdn.pixabay.com/photo/2015/03/04/22/35/head-659651_960_720.png",
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
  },
  creaditedAmt:{
type:Number,
default:0
  },
  payout:{
    type:Number,
    default:0
  },
  remaining:{
    type:Number,
    default:0
  }
  },



  { timestamps: true }
);


module.exports = mongoose.model("user", thisSchema);
