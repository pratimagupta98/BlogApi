const mongoose = require("mongoose")
const Schema = mongoose.Schema


const thisSchema = new Schema({

    planet_name:{
        type: String
    },
    point_range:{
        type: String
    },
    doller_rupees:{
        type: Number
    },
    img:{
        type: String
    }
    
},
    { timestamps: true }
)

module.exports = mongoose.model("plant_position", thisSchema)
