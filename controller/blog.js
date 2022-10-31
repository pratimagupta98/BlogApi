const Blog = require("../models/blog");
const resp = require("../helpers/apiResponse");

const fs = require("fs");
const cloudinary = require("cloudinary").v2;
const dotenv = require("dotenv");
 
const jwt = require("jsonwebtoken");
const key = "verysecretkey";
const bcrypt = require("bcrypt");
dotenv.config();
cloudinary.config({
  cloud_name: process.env.CLOUD_NAME,
  api_key: process.env.CLOUDINARY_API_KEY,
  api_secret: process.env.CLOUDINARY_API_SECRET,
});


exports.addBlog = async (req, res) => {
  //console.log(req.body);
  const { blog_title, blogImg,posted_by,posted_by_img, desc,blog_type } = req.body;

  const newBlog = new Blog({
    blog_title: blog_title,
    blogImg: blogImg,
    posted_by:posted_by,
    posted_by_img:posted_by_img,
    desc: desc,
    blog_type:blog_type
  });

  
    const findexist = await Blog.findOne({
        blog_title: blog_title,
    });
    if (findexist) {
        resp.alreadyr(res);
    } else {
        if (req.files) {
            if (req.files.blogImg) {
              alluploads = [];
              for (let i = 0; i < req.files.blogImg.length; i++) {
                const resp = await cloudinary.uploader.upload(
                  req.files.blogImg[i].path,
                  { use_filename: true, unique_filename: false }
                );
                fs.unlinkSync(req.files.blogImg[i].path);
                alluploads.push(resp.secure_url);
              }
              newBlog.blogImg = alluploads;
            }
          }
          if (req.files) {
            if (req.files.posted_by_img) {
              alluploads = [];
              for (let i = 0; i < req.files.posted_by_img.length; i++) {
                const resp = await cloudinary.uploader.upload(
                  req.files.posted_by_img[i].path,
                  { use_filename: true, unique_filename: false }
                );
                fs.unlinkSync(req.files.posted_by_img[i].path);
                alluploads.push(resp.secure_url);
              }
              newBlog.posted_by_img = alluploads;
            }
          }
          newBlog.save()
      
      
            .then((data) => resp.successr(res, data))
            .catch((error) => resp.errorr(res, error));
        };
};

exports.getBlog = async (req, res) => {
await Blog.find() 
.sort({ sortorder: 1 })
.then((data) => resp.successr(res, data))
.catch((error) => resp.errorr(res, error));
};

exports.popularBlog = async (req, res) => {
    await Blog.find({"blog_type":"Popular"}) 
    .sort({ sortorder: 1 })
    .then((data) => resp.successr(res, data))
    .catch((error) => resp.errorr(res, error));
    };

    exports.recomanded_Blog = async (req, res) => {
        await Blog.find({"blog_type":"Recommended"}) 
        .sort({ sortorder: 1 })
        .then((data) => resp.successr(res, data))
        .catch((error) => resp.errorr(res, error));
        };

exports.viewoneBlog = async (req, res) => {
await Blog.findOne({ _id: req.params.id })
.then((data) => resp.successr(res, data))
.catch((error) => resp.errorr(res, error));
};

exports.delBlog = async (req, res) => {
    await Blog.deleteOne({ _id: req.params.id })
      .then((data) => resp.deleter(res, data))
      .catch((error) => resp.errorr(res, error));
  };

 


 
exports.editBlog = async(req,res)=>{
    const{blog_title,blogImg,desc,posted_by,blog_type,status} = req.body
    
    data ={}
    if(blog_title) {
        data.blog_title = blog_title
    }
    if(desc){
        data.desc = desc
    }
    if(posted_by){
      data.posted_by =posted_by
    }
    if(blog_type){
      data.blog_type= blog_type
    }if(status){
      data.status = status
    }
  
    if (req.files) {
        if (req.files.blogImg) {
          alluploads = [];
          for (let i = 0; i < req.files.blogImg.length; i++) {
            // console.log(i);
            const resp = await cloudinary.uploader.upload(req.files.blogImg[i].path, {
              use_filename: true,
              unique_filename: false,
            });
            fs.unlinkSync(req.files.blogImg[i].path);
            alluploads.push(resp.secure_url);
          }
          // newStore.storeImg = alluploads;
          data.blogImg = alluploads;
        }
     }
     await Blog.findOneAndUpdate(
        { _id: req.params.id},
        { $set: data },
        { new: true }
      )
        .then((data) => resp.successr(res, data))
        .catch((error) => resp.errorr(res, error));
    };