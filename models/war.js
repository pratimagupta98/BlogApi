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

       category:{
        type: String, 
       },

       resource_1:{
        type: mongoose.Schema.Types.ObjectId,
        ref: "submit_resrc"
    },
    resource_2:{
      type: mongoose.Schema.Types.ObjectId,
      ref: "submit_resrc"
  }
      

      },
     
    { timestamps: true }
  );


  module.exports = mongoose.model("war", thisSchema);
