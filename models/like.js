const mongoose = require("mongoose")
const Schema = mongoose.Schema


const thisSchema = new Schema({

    submitresrcId:{
        type: mongoose.Schema.Types.ObjectId,
        ref: "submitRsrc"
    },
    userid:{
        type: mongoose.Schema.Types.ObjectId,
        ref: "user"
    },
    status:{
        type:String
    }
    //like,unlike
     
},
    { timestamps: true }
)

module.exports = mongoose.model("like", thisSchema)
