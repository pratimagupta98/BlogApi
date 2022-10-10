const mongoose = require("mongoose");
const Schema = mongoose.Schema;
const thisSchema = new Schema(
    {
     
      
       title:{
        type: String, 
       },
       
       desc:{
        type: String, 
       },
       cat_img:{
        type :Array
       }
      },
     
    { timestamps: true }
  );


  module.exports = mongoose.model("category", thisSchema);
