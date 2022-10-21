const mongoose = require("mongoose")
const Schema = mongoose.Schema


const thisSchema = new Schema({

    userid:{
        type:mongoose.Schema.Types.ObjectId,
        ref:"user"
    },
    email:{
        type: String
    },
     
},
    { timestamps: true }
)

module.exports = mongoose.model("newsletter", thisSchema)
