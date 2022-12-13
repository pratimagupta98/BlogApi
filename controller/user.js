const User = require("../models/user");
const resp = require("../helpers/apiResponse");
const bcrypt = require("bcryptjs");
const cloudinary = require("cloudinary").v2;
 const key = "verysecretkey"; 
  const dotenv = require("dotenv");
  const fs = require("fs");
  const Submit = require("../models/submit_resrc");

  dotenv.config();
 cloudinary.config({
   cloud_name: process.env.CLOUD_NAME,
   api_key: process.env.CLOUDINARY_API_KEY,
   api_secret: process.env.CLOUDINARY_API_SECRET,
 });
 

 const { uploadBase64ImageFile } = require("../helpers/awsuploader");
var signatures = {
  JVBERi0: "application.pdf",
  R0lGODdh: "image.gif",
  R0lGODlh: "image.gif",
  iVBORw0KGgo: "image.png",
  "/9j/": "image.jpg"
};

function detectMimeType(b64) {
  for (var s in signatures) {
    if (b64.indexOf(s) === 0) {
      return signatures[s];
    }
  }
}


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
  
    const findexist = await User.findOne({$or:[{
   email: email },{username: username }]}
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
    const {  email, password,username } = req.body;
    const user = await User.findOne( {   $or: [{ email: email }, { username: username }],
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



  if(profileImg){
    if(profileImg){
  const base64Data   = new Buffer.from(profileImg.replace(/^data:image\/\w+;base64,/, ""),'base64')
  detectMimeType(base64Data);
  const type = detectMimeType(profileImg);
     // console.log(newCourse,"@@@@@");
     const geturl = await uploadBase64ImageFile(
      base64Data,
      data.id,
     type
    );
    console.log(geturl,"&&&&");
    if (geturl) {
      data.profileImg = geturl.Location;
     
      //fs.unlinkSync(`../uploads/${req.files.course_image[0]?.filename}`);
    }
  }
}
  await User.findOneAndUpdate(
    { _id: req.params.id },
    { $set: data },
    { new: true }
  )
    .then((data) => resp.successr(res, data))
    .catch((error) => resp.errorr(res, error));
};



//   if (req.files) {
//     if (req.files.profileImg) {
//       alluploads = [];
//       for (let i = 0; i < req.files.profileImg.length; i++) {
//         // console.log(i);
//         const resp = await cloudinary.uploader.upload(req.files.profileImg[i].path, {
//           use_filename: true,
//           unique_filename: false,
//         });
//         fs.unlinkSync(req.files.profileImg[i].path);
//         alluploads.push(resp.secure_url);
//       }
//       // newStore.storeImg = alluploads;
//       data.profileImg = alluploads;
//     }
//  }

//  await User.findOneAndUpdate(
//   {
//     _id: req.params.id,
//     //  console.log(req.params._id);
//   },
//   {
//     $set: data,
//   },
//   { new: true }
// )
//       .then((data) => resp.successr(res, data))
//       .catch((error) => resp.errorr(res, error));
//   };
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

  exports.total_user = async(req,res) =>{
    await User.countDocuments()
    .sort({ createdAt: -1 })
    .then((data) => resp.successr(res, data))
    .catch((error) => resp.errorr(res, error));
  }

 // countDocuments()

 exports.karma_crrnt_month = async (req, res) => {
var date = new Date();
var firstDay = new Date(date.getFullYear(), date.getMonth(), 2);
var lastDay = new Date(date.getFullYear(), date.getMonth() + 1, 0);
console.log("FIRST",firstDay)
console.log("lAST",lastDay)
const getdata = await Submit.find({ $and: [
  { aprv_status: "Active" },
  {
    createdAt: {
      $gte: new Date(firstDay),
      $lte: new Date(lastDay)
    },
    
  }
]
}).sort({meteors:-1}).populate("userid")
.sort({ createdAt: -1 }).limit(6)
// console.log("GETONE",getdata)
// const getlength = getdata.length
// console.log("LENGTH",getlength)
.then((data) => resp.successr(res, data))
.catch((error) => resp.errorr(res, error));

 }


//  let qq=new Date(new Date().setFullYear(new Date().getFullYear() ))

//  const date1 = ("0" + qq.getDate()).slice(-2);
//  console.log("date1",date1)
//  const month = ("0" + (qq.getMonth() + 1)).slice(-2);
//  const year = qq.getFullYear();
//  console.log("month",month)

//  var createdAt = "2022-12-03T12:44:20.221+00:00"
//  var date = new Date(createdAt)
//  console.log(date.getDate() +  " " + date.toLocaleString('default', { month: 'long' }) + " " + date.getFullYear())
 
//  // Or even more concise (Thanks @RobG)
//  console.log(date.toLocaleString('en-GB', {day:'numeric', month: 'long', year:'numeric'}))


 
// function toTimestamp(strDate){
//  var datum = Date.parse(strDate);
//  return datum/1000;
// }

// var timeStamp = Date.now()
// var date = new Date(timeStamp);
// console.log(date)



// const getone = await Submit.find({$or: [{createdAt:firstDay},{$or:[{createdAt:lastDay}]}
// ]})

exports.all_time_karma= async (req, res) => {
  const getmetores = await User.find({status:"Active"})
  .sort({meteors:-1}).limit(6)
  // .sort({ createdAt: -1 }).limit(6)
   
  .then((data) => resp.successr(res, data))
  .catch((error) => resp.errorr(res, error));
  
   
}