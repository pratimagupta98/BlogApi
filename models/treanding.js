const mongoose = require("mongoose");
const Schema = mongoose.Schema;
const thisSchema = new Schema(
    {
     
     
       submit_rsrcId:{
        type:mongoose.Schema.Types.ObjectId,
ref:"category"
       },
       status:{
        type:String
       },
      },
     
    { timestamps: true }
  );


  module.exports = mongoose.model("trending", thisSchema);
