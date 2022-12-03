const mongoose = require("mongoose")
const Schema = mongoose.Schema


const thisSchema = new Schema({

    planet_name:{
        type: String
    },
    points:{
        type: String
    },
    doller_rupees:{
        type: Number
    },
    
},
    { timestamps: true }
)

module.exports = mongoose.model("leaderbored", thisSchema)
