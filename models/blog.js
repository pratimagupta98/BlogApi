const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const thisSchema = new Schema(
  {
    blog_title: {
      type: String,
    },
    blogImg: {
      type: Array,
    },
   posted_by:{
    type: String,
   },
   posted_by_img:{
    type: Array,
   },
    desc: {
      type: String,
      default: "Active",
    },
    blog_type:{
        type: String,
        //Recommanded , popular blogs
    }
  },
  { timestamps: true }
);

module.exports = mongoose.model("blog", thisSchema);
