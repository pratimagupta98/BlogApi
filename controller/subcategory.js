const SubCategory = require("../models/subcategory");
const resp = require("../helpers/apiResponse");
// const cloudinary = require("cloudinary").v2;
// const fs = require("fs");

exports.addSubCategory= async (req, res) => {
  const { title,category,desc,Subcat_img} = req.body;

  const newSubCategory= new SubCategory({
    title:title,
    desc:desc,
    category:category,
    Subcat_img:Subcat_img
    
    
   });
   const findexist = await SubCategory.findOne({ title: title });
   if (findexist) {
     resp.alreadyr(res);
   } 
   else {
    if (req.files) {
      if (req.files.Subcat_img) {
        alluploads = [];
        for (let i = 0; i < req.files.Subcat_img.length; i++) {
          const resp = await cloudinary.uploader.upload(
            req.files.Subcat_img[i].path,
            { use_filename: true, unique_filename: false }
          );
          fs.unlinkSync(req.files.Subcat_img[i].path);
          alluploads.push(resp.secure_url);
        }
        newSubCategory.Subcat_img = alluploads;
      }
    }
    newSubCategory
       .save()
       .then((data) => resp.successr(res, data))
       .catch((error) => resp.errorr(res, error));
   }
 }
 

exports.getallSubCategory = async (req, res) => {
    await SubCategory.find().populate("category")
      .sort({ createdAt: -1 })
      .then((data) => resp.successr(res, data))
      .catch((error) => resp.errorr(res, error));
  };

  exports.getoneSubCategory = async (req, res) => {
    await SubCategory.findOne({ _id: req.params.id }).populate("category")
      .then((data) => resp.successr(res, data))
      .catch((error) => resp.errorr(res, error));
  };
  

  exports.editSubCategory = async (req, res) => {
    await SubCategory.findOneAndUpdate(
      {
        _id: req.params.id,
      },
      { $set: req.body },
      { new: true }
    )
      .then((data) => resp.successr(res, data))
      .catch((error) => resp.errorr(res, error));
  };
  

  exports.dltSubCategory= async (req, res) => {
    await SubCategory.deleteOne({ _id: req.params.id })
      .then((data) => resp.deleter(res, data))
      .catch((error) => resp.errorr(res, error));
  };
  

  exports.listbysubCategory = async (req, res) => {
    await SubCategory.find({ category: req.params.id }).populate("category")
        .sort({ sortorder: 1 })
         
        .then((data) => resp.successr(res, data))
        .catch((error) => resp.errorr(res, error));
    };