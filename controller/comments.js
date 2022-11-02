const Comment = require("../models/comments");
const resp = require("../helpers/apiResponse");
// const cloudinary = require("cloudinary").v2;
// const fs = require("fs");

exports.add_Comment = async (req, res) => {
  const {submitresrcId,userid,desc,comment,rating,status } = req.body;

  const newComment = new Comment({
    submitresrcId:submitresrcId,
    userid:userid,
    desc:desc,
    comment:comment,
    rating:rating,
    status:status,

    
  })
  const findexist = await Comment.findOne({
    $and: [{ submitresrcId: submitresrcId }, { userid: userid }] }
     )
     if (findexist) {
       resp.alreadyr(res);
     }else{
        newComment
       .save()
       .then((data) => resp.successr(res, data))
       .catch((error) => resp.errorr(res, error));
     }
 }
 

exports.comment_list = async (req, res) => {
    await Comment.find({status: "Active" }).populate("userid").populate("submitresrcId").populate({
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
    await Comment.findOneAndUpdate(
      {
        _id: req.params.id,
      },
      { $set: req.body},
      { new: true }
    )
      .then((data) => resp.successr(res, data))
      .catch((error) => resp.errorr(res, error));
  };
  

  exports.dlt_Coment= async (req, res) => {
    await Comment.deleteOne({ _id: req.params.id })
      .then((data) => resp.deleter(res, data))
      .catch((error) => resp.errorr(res, error));
  };
  