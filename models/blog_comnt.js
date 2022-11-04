const mongoose = require("mongoose")
const Schema = mongoose.Schema


const thisSchema = new Schema({

     
    blogid:{
        type: mongoose.Schema.Types.ObjectId,
        ref: "blog"
    },
    userid:{
        type: mongoose.Schema.Types.ObjectId,
        ref: "user"
    },
    status:{
        type:String,
        default:"Deactive"
    },
    desc:{
        type:String
    },
    comment:{
        type:String
    },
    rating: {
        type: Number,
        min: 1,
        max: 5
      },
   
     
},
    { timestamps: true }
)

module.exports = mongoose.model("Blogcomment", thisSchema)
