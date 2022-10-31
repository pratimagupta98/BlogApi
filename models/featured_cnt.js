const mongoose = require("mongoose")
const Schema = mongoose.Schema


const thisSchema = new Schema({

    image:{
        type: String
    },
    video_link:{
        type: String
    },
     
},
    { timestamps: true }
)

module.exports = mongoose.model("featured", thisSchema)
