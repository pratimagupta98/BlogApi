const SubCategory = require("../models/subcategory");
const resp = require("../helpers/apiResponse");

exports.addSubCategory= async (req, res) => {
  const { title,category,desc} = req.body;

  const newSubCategory= new SubCategory({
    title:title,
    desc:desc,
    category:category
    
    
   });
   const findexist = await SubCategory.findOne({ title: title });
   if (findexist) {
     resp.alreadyr(res);
   } else {
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
  