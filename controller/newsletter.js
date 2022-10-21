const NewsLLtr = require("../models/newsletter");
const resp = require("../helpers/apiResponse");
// const cloudinary = require("cloudinary").v2;
// const fs = require("fs");

exports.add_news_ltr= async (req, res) => {
  const {userid,email } = req.body;

  const newNewsLLtr= new NewsLLtr({
    userid:userid,
    email:email,
    
  })
    newNewsLLtr
       .save()
       .then((data) => resp.successr(res, data))
       .catch((error) => resp.errorr(res, error));
  
 }
 

exports.get_new_list = async (req, res) => {
    await NewsLLtr.find().populate("category")
      .sort({ createdAt: -1 })
      .then((data) => resp.successr(res, data))
      .catch((error) => resp.errorr(res, error));
  };

  exports.getone_news_ltr = async (req, res) => {
    await NewsLLtr.findOne({ _id: req.params.id }).populate("category")
      .then((data) => resp.successr(res, data))
      .catch((error) => resp.errorr(res, error));
  };
  

  exports.edit_news_ltr = async (req, res) => {
    await NewsLLtr.findOneAndUpdate(
      {
        _id: req.params.id,
      },
      { $set: req.body },
      { new: true }
    )
      .then((data) => resp.successr(res, data))
      .catch((error) => resp.errorr(res, error));
  };
  

  exports.dlt_news_ltr= async (req, res) => {
    await SubCategory.deleteOne({ _id: req.params.id })
      .then((data) => resp.deleter(res, data))
      .catch((error) => resp.errorr(res, error));
  };
  