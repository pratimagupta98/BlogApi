const mongoose = require("mongoose")
const Schema = mongoose.Schema


const thisSchema = new Schema({

    submitresrcId:{
        type: String
    },
    userid:{
        type: String
    },
    status:{
        type:String
    }
    //like,unlike
     
},
    { timestamps: true }
)

module.exports = mongoose.model("like", thisSchema)
