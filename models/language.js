const mongoose = require("mongoose")
const Schema = mongoose.Schema


const thisSchema = new Schema({

    language:{
        type: String
    },
     
},
    { timestamps: true }
)

module.exports = mongoose.model("language", thisSchema)
