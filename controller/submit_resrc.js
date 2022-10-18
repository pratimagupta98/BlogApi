const Submit = require("../models/submit_resrc");
const resp = require("../helpers/apiResponse");
 const cloudinary = require("cloudinary").v2;
 const fs = require("fs");

exports.addSub_resrc= async (req, res) => {
  const { userid,link,category,sub_category,type,format,language,topics,desc,resTitle,creatorName,relYear,res_desc,comment} = req.body;

  const newSubmit= new Submit({
    userid:userid,
    link:link,
    category:category,
    sub_category:sub_category,
    type:type,
    format:format,
    language:language,
    topics:topics,
    desc:desc,
    resTitle:resTitle,
    creatorName:creatorName,
    relYear:relYear,
    res_desc:res_desc,
    comment:comment
    
    
   });
    
    
   
    if (req.files) {
      if (req.files.img) {
        alluploads = [];
        for (let i = 0; i < req.files.img.length; i++) {
          const resp = await cloudinary.uploader.upload(
            req.files.img[i].path,
            { use_filename: true, unique_filename: false }
          );
          fs.unlinkSync(req.files.img[i].path);
          alluploads.push(resp.secure_url);
        }
        newSubmit.img = alluploads;
      }
    }
    newSubmit
       .save()
       .then((data) => resp.successr(res, data))
       .catch((error) => resp.errorr(res, error));
   }
 
 

exports.sub_res_lsit = async (req, res) => {
    await Submit.find().populate("category")
      .sort({ createdAt: -1 })
     
      .populate("category").populate("sub_category").populate("language").populate("relYear").populate("userid")
      .then((data) => resp.successr(res, data))
      .catch((error) => resp.errorr(res, error));
  };

  exports.getone_reslist = async (req, res) => {
    await Submit.findOne({ _id: req.params.id }).populate("category").populate("sub_category").populate("language").populate("relYear").populate("userid")
      .then((data) => resp.successr(res, data))
      .catch((error) => resp.errorr(res, error));
  };
  

  exports.editSubCategory = async (req, res) => {
    await Submit.findOneAndUpdate(
      {
        _id: req.params.id,
      },
      { $set: req.body },
      { new: true }
    )
      .then((data) => resp.successr(res, data))
      .catch((error) => resp.errorr(res, error));
  };
  

  exports.dlt_subres_list= async (req, res) => {
    await Submit.deleteOne({ _id: req.params.id })
      .then((data) => resp.deleter(res, data))
      .catch((error) => resp.errorr(res, error));
  };
  