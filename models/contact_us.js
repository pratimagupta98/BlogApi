const mongoose = require("mongoose");
const Schema = mongoose.Schema;
const thisSchema = new Schema(
    {
     
      
        name :{
        type: String, 
       },
       
       email:{
        type: String, 
       },
       mobile:{ 
        type :String
       },
       msg:{
        type :String
       },
       userid:{
        type: mongoose.Schema.Types.ObjectId,
        ref: "user"},
      },
     
    { timestamps: true }
  );


  module.exports = mongoose.model("contactus", thisSchema);
