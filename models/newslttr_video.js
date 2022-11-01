const mongoose = require("mongoose")
const Schema = mongoose.Schema


const thisSchema = new Schema({

   
    videoid:{
        type: String
    },
     
},
    { timestamps: true }
)

module.exports = mongoose.model("newsletterVideo", thisSchema)
