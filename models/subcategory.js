const mongoose = require("mongoose");
const Schema = mongoose.Schema;
const thisSchema = new Schema(
    {
     
      
       title:{
        type: String, 
       },
       category:{
type:mongoose.Schema.Types.ObjectId,
ref:"category"
       },
       desc:{
        type: String, 
       },
       
      },
     
    { timestamps: true }
  );


  module.exports = mongoose.model("subcategory", thisSchema);
