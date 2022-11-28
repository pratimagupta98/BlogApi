const Comment = require("../models/comments");
const resp = require("../helpers/apiResponse");
const User = require("../models/user");
var _ = require('lodash');

// const cloudinary = require("cloudinary").v2;
// const fs = require("fs");
const Blogcomment = require("../models/blog_comnt");

exports.add_Comment = async (req, res) => {
  const {submitresrcId,userid,comment,rating,status } = req.body;

  const newComment = new Comment({
    submitresrcId:submitresrcId,
    userid:userid,
  //  desc:desc,
    comment:comment,
    rating:rating,
    status:status,
  })
  // const findexist = await Comment.findOne({
  //   $and: [{ submitresrcId: submitresrcId }, { userid: userid }] }
  //    )
  //    if (findexist) {
  //      resp.alreadyr(res);
  //    }else{
        newComment
       .save()
       .then((data) => resp.successr(res, data))
       .catch((error) => resp.errorr(res, error));
     //}
 }
 




exports.comment_list = async (req, res) => {
    await Comment.find({ $and: [{ submitresrcId: req.params.id }, { status: "Active" }]}).populate("userid").populate("submitresrcId").populate({
        path: "submitresrcId",
        populate: {
          path: "category",
        },
      })
      .sort({ createdAt: -1 })
      .then((data) => resp.successr(res, data))
      .catch((error) => resp.errorr(res, error));
  };

  exports.admin_comment_list = async (req, res) => {
    await Comment.find().populate("userid").populate("submitresrcId").populate({
        path: "submitresrcId",
        populate: {
          path: "category",
        },
      })
      .sort({ createdAt: -1 })
      .then((data) => resp.successr(res, data))
      .catch((error) => resp.errorr(res, error));
  };

  exports.getone_coment_list = async (req, res) => {
    await Comment.findOne({ _id: req.params.id }).populate("userid").populate("submitresrcId").populate({
        path: "submitresrcId",
        populate: {
          path: "category",
        },
      })
      .then((data) => resp.successr(res, data))
      .catch((error) => resp.errorr(res, error));
  };
  

  exports.admin_edit_coment = async (req, res) => {
   const upateone= await Comment.findOneAndUpdate(
      {
        _id: req.params.id,
      },
      { $set: req.body},
      { new: true }
    )
    if(upateone.status == "Active"){
      //   const getpoint = upateone.meteors
      //   console.log("getpoint",getpoint)
  
      //  const totalmetors = parseInt(getpoint)+ parseInt(10)
      const getdata = await Comment.findOne({_id :req.params.id}).populate("userid")
      console.log("STRING",getdata)
      const getuser = (getdata.userid)
      console.log("getuser",getuser)
      const findmeteros =getuser.meteors 
      console.log("METEROS",findmeteros)
  
      var total =parseInt (findmeteros) + parseInt(2)
  
      const updateuser =  await User.findOneAndUpdate(
        {
          _id:getuser ,
        },
        { $set: {meteors:total} },
        { new: true }
  
      )
  
      
   // const getmet  = updateuser.meteors
    console.log("SSSS",updateuser)
      res.status(200).json({
        status: true,
        status: "success",
        data: upateone,
        meteors:updateuser.meteors
      });
      }


      // .then((data) => resp.successr(res, data))
      // .catch((error) => resp.errorr(res, error));
  };
  

  exports.dlt_Coment= async (req, res) => {
    await Comment.deleteOne({ _id: req.params.id })
      .then((data) => resp.deleter(res, data))
      .catch((error) => resp.errorr(res, error));
  };
  

  exports.add_blog_Comment = async (req, res) => {
    const {blogid,userid,desc,comment,rating,status } = req.body;
  
    const newBlogcomment = new Blogcomment({
      blogid:blogid,
      userid:userid,
      desc:desc,
      comment:comment,
      rating:rating,
      status:status,
    })
    const findexist = await Blogcomment.findOne({
      $and: [{ blogid: blogid }, { userid: userid }] }
       )
       if (findexist) {
         resp.alreadyr(res);
       }else{
        newBlogcomment
         .save()
         .then((data) => resp.successr(res, data))
         .catch((error) => resp.errorr(res, error));
       }
   }


   exports.userBlog_Cmntlist = async (req, res) => {
    await Blogcomment.find({status: "Active" }).populate("userid").populate("blogid")
       
      .sort({ createdAt: -1 })
      .then((data) => resp.successr(res, data))
      .catch((error) => resp.errorr(res, error));
  };

  exports.adminBlog_Cmntlist = async (req, res) => {
    await Blogcomment.find().populate("userid").populate("blogid")
      .sort({ createdAt: -1 })
      .then((data) => resp.successr(res, data))
      .catch((error) => resp.errorr(res, error));
  };

  exports.getoneBlog_Cmntlist = async (req, res) => {
    await Blogcomment.findOne({ _id: req.params.id }).populate("userid").populate("blogid")
      .then((data) => resp.successr(res, data))
      .catch((error) => resp.errorr(res, error));
  };
  

  exports.editBlog_Cmntlist = async (req, res) => {
    await Blogcomment.findOneAndUpdate(
      {
        _id: req.params.id,
      },
      { $set: req.body},
      { new: true }
    )
      .then((data) => resp.successr(res, data))
      .catch((error) => resp.errorr(res, error));
  };
  

  exports.dltBlog_Cmntlist= async (req, res) => {
    await Blogcomment.deleteOne({ _id: req.params.id })
      .then((data) => resp.deleter(res, data))
      .catch((error) => resp.errorr(res, error));
  };



  exports.filterByRating= async (req, res) => {
    await Comment.find({rating:req.params.id})
      .sort({ createdAt: -1 }).populate("userid").populate("submitresrcId").populate({
        path: "submitresrcId",
        populate: {
          path: "category",
        },
      })
    
      
      .then((data) => resp.successr(res, data))
      .catch((error) => resp.errorr(res, error));
  };
 // {"razorpay_payment_id": {$ne: ''  }},{"razorpay_payment_id":{ $ne: undefined }

  // ({$and: [
      
  //   {$and:[{"type": "Paid"}]},{$or:[{status :"Active"},{aprv_status: "Active"}]}
  //       ]})


  exports.average_rating = async (req, res) => {
  //  const getrating= await Comment.find({ $and: [{ submitresrcId: req.params.id }, { status: "Active" }]})

 const getrating = await Comment.find ({$and: [
      
    {$and:[{submitresrcId: req.params.id},{status: "Active"}]},{$or:[{"rating": {$ne: ''  }},{"rating":{ $ne: undefined }}]}
        ]})
   if(getrating){
       var newarr1 = getrating.map(function (value) {
       // return value+= value;
return value.rating
      });

      // let total = newarr1/

      console.log("New Array",newarr1)
      console.log(newarr1.length); // undefined
       var ttlr = newarr1.length
       console.log("tt",ttlr)
      let ratingttl = _.sumBy([...newarr1]);
      console.log("rTotal",ratingttl);
let average = ratingttl/ttlr
console.log("Avrage",average)
res.status(200).json({
  status:"true",
  msg :"success",
  data :average
})
   }else{
res.status(400).json({
  status: false,
  msg: "error",
  error: "error",
});
   }
};
     
        // for (let i = 0; i <= getr.length; i++) {
        //   if (getr[i].rating == undefined) {
        //   } else {
        //     sum += getr[i].rating;
        //     totalRating.push(getr[i].rating);
        //   }
        // } 
        // console.log("result",totalRating)
      
      // let sumprofit1 = _.sumBy([...newarr1]);
      // console.log("PROFIT11",sumprofit1)

       
  