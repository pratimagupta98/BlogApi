const User = require("../models/user");
const resp = require("../helpers/apiResponse");
const bcrypt = require("bcryptjs");
const cloudinary = require("cloudinary").v2;
 const key = "verysecretkey"; 
  const dotenv = require("dotenv");
  const fs = require("fs");

  dotenv.config();
 cloudinary.config({
   cloud_name: process.env.CLOUD_NAME,
   api_key: process.env.CLOUDINARY_API_KEY,
   api_secret: process.env.CLOUDINARY_API_SECRET,
 });
 


exports.signup = async (req, res) => {
    const {
      username,
      email,
      status,
      password,
      
    } = req.body;
  
    const salt = await bcrypt.genSalt(10);
    const hashPassword = await bcrypt.hash(password, salt);
   
    
    const newuser = new User({
        username: username,
      email: email,
      status,status,
      password: hashPassword,
    
    });
  
    const findexist = await User.findOne({
   email: email }
    )
    if (findexist) {
      resp.alreadyr(res);
    } else {
      newuser
        .save()
        .then((data) => resp.successr(res, data))
        
        .catch((error) => resp.errorr(res, error));
    }
  };

  exports.login = async (req, res) => {
    const {  email, password } = req.body;
    const user = await User.findOne( { email: email 
    });
    console.log("user", user);
    if (user) {
        
      const validPass = await bcrypt.compare(password, user.password);
      if (validPass) {
        res.status(200).send({
          status: true,
          msg: "success",
          user: user,
        });
      } else {
        res.status(400).json({
          status: false,
          msg: "Incorrect Password",
          error: "error",
        });
      }
    } else {
      res.status(400).json({
        status: false,
        msg: "User Doesnot Exist",
        error: "error",
      });
    }
  };

  exports.updateProfile = async (req, res) => {
  const  {username,email,display_name,abt_us,profileImg} = req.body

  data = {};
  if(username){
    data.username = username;
  }
  if (email) {
    data.email = email
  }
  if (display_name) {
    data.display_name = display_name
  }
  if(abt_us){
    data.abt_us = abt_us
  }
  if (req.files) {
    if (req.files.profileImg) {
      alluploads = [];
      for (let i = 0; i < req.files.profileImg.length; i++) {
        // console.log(i);
        const resp = await cloudinary.uploader.upload(req.files.profileImg[i].path, {
          use_filename: true,
          unique_filename: false,
        });
        fs.unlinkSync(req.files.profileImg[i].path);
        alluploads.push(resp.secure_url);
      }
      // newStore.storeImg = alluploads;
      data.profileImg = alluploads;
    }
 }

 await User.findOneAndUpdate(
  {
    _id: req.params.id,
    //  console.log(req.params._id);
  },
  {
    $set: data,
  },
  { new: true }
)
      .then((data) => resp.successr(res, data))
      .catch((error) => resp.errorr(res, error));
  };
  exports.getoneUser = async (req, res) => {
    await User.findOne({ _id: req.params.id })
      .then((data) => resp.successr(res, data))
      .catch((error) => resp.errorr(res, error));
  };

  exports.userlist = async (req, res) => {
    await User.find()
      .sort({ createdAt: -1 })
      .then((data) => resp.successr(res, data))
      .catch((error) => resp.errorr(res, error));
  };

  exports.dltUser= async (req, res) => {
    await User.deleteOne({ _id: req.params.id })
      .then((data) => resp.deleter(res, data))
      .catch((error) => resp.errorr(res, error));
  };

  

  exports.user_aprv_sts = async (req, res) => {
    await User.findOneAndUpdate(
      {
        _id: req.params.id,
      },
      { $set:{ status:req.body.status} },
      { new: true }
    )
      .then((data) => resp.successr(res, data))
      .catch((error) => resp.errorr(res, error));
  };