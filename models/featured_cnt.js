const mongoose = require("mongoose")
const Schema = mongoose.Schema


const thisSchema = new Schema({

    thumbnail_img:{
        type: Array
    },
    video_link:{
        type: String
    },
     
},
    { timestamps: true }
)

module.exports = mongoose.model("featured", thisSchema)
