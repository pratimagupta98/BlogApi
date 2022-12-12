const mongoose = require("mongoose");
const Schema = mongoose.Schema;
const thisSchema = new Schema(
    {
     
     
        topics:{
        type:String
        },
       status:{
        type:String
       },
      },
     
    { timestamps: true }
  );


  module.exports = mongoose.model("trending", thisSchema);
