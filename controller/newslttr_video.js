const Video = require("../models/newslttr_video");
const resp = require("../helpers/apiResponse");
const cloudinary = require("cloudinary").v2;
const fs = require("fs");

exports.add_Video= async (req, res) => {
  const { videoid} = req.body;

  const newVideo = new Video({
    
    videoid:videoid,
     
   });
 
 
   newVideo
       .save()
       .then((data) => resp.successr(res, data))
       .catch((error) => resp.errorr(res, error));
   }
 
 

exports.getVideo = async (req, res) => {
    await Video.find()
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
    const {title,desc,category,Subcat_img} = req.body
    data = {};

    if(title){
      data.title = title
    }
    if(desc){
      data.desc  = desc
    }
    if(category){
      data.category =category
    }
    

    if (req.files) {
      if (req.files.Subcat_img) {
        alluploads = [];
        for (let i = 0; i < req.files.Subcat_img.length; i++) {
          // console.log(i);
          const resp = await cloudinary.uploader.upload(req.files.Subcat_img[i].path, {
            use_filename: true,
            unique_filename: false,
          });
          fs.unlinkSync(req.files.Subcat_img[i].path);
          alluploads.push(resp.secure_url);
        }
        // newStore.storeImg = alluploads;
        data.Subcat_img = alluploads;
      }
   }
    await SubCategory.findOneAndUpdate(
      {
        _id: req.params.id,
      },
      { $set: data},
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
    await SubCategory.find({ category: req.params.id }).populate("category").populate("relYear")
        .sort({ sortorder: 1 })
         
        .then((data) => resp.successr(res, data))
        .catch((error) => resp.errorr(res, error));
    };