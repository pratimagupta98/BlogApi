const mongoose = require("mongoose")
const Schema = mongoose.Schema


const thisSchema = new Schema({

    yrName:{
        type: String
    },
     
},
    { timestamps: true }
)

module.exports = mongoose.model("year", thisSchema)


