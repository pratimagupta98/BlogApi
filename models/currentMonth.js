const mongoose = require("mongoose")
const Schema = mongoose.Schema


const crrntMonthSchema = new Schema({

    submitresrcId:{
        type: mongoose.Schema.Types.ObjectId,
        ref: "submitRsrc"
    },
    
    userid:{
        type: mongoose.Schema.Types.ObjectId,
        ref: "user"
    },
    status:{
        type:String,
        default:"Deactive"
    },
    // desc:{
    //     type:String
    // },
    comment:{
        type:String
    },
    rating: {
        type: Number,
        min: 1,
        max: 5
      },
     
      meteors:{
        type: Number,
      },
      link: {
        type: String,
    },
    category: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "category"
    },
    sub_category: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "subcategory"
    },
    type: {
        type: String,
        //free , paid
    },
    format: {
        type: String,
    },
    language: [{
        type: mongoose.Schema.Types.ObjectId,
        ref: "language"
    }],
    topics: [{
        type: String
    }],
    desc: {
        type: String,
    },

    img: {
        type: String,
    },
    resTitle:{
        type: String,
    },
    creatorName:{
        type: String,
    },
    relYear:[{
        type: mongoose.Schema.Types.ObjectId,
        ref: "year"
    }],
    res_desc:{
        type: String,
    },
   
    crrntMonth:{
type:Number,
//default:0
    },
    usertype:{
        type: String,
    },
    crntmnth_planetImg:{
        type:String
      },
      crntmnth_winnerImg:{
        type:String
      },
     
},
    { timestamps: true }
)

module.exports = mongoose.model("crrntMonth", crrntMonthSchema)
