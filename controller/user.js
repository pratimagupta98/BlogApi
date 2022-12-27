const User = require("../models/user");
const resp = require("../helpers/apiResponse");
const bcrypt = require("bcryptjs");
const cloudinary = require("cloudinary").v2;
 const key = "verysecretkey"; 
  const dotenv = require("dotenv");
  const fs = require("fs");
  const Submit = require("../models/submit_resrc");
  const { sendmail } = require("./mail");
  const nodemailer = require("nodemailer");


  dotenv.config();
 cloudinary.config({
   cloud_name: process.env.CLOUD_NAME,
   api_key: process.env.CLOUDINARY_API_KEY,
   api_secret: process.env.CLOUDINARY_API_SECRET,
 });
 

 const { uploadBase64ImageFile } = require("../helpers/awsuploader");
const { values } = require("lodash");
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
      //   const subject = `Buynaa Email Verification`;
      //   // let text = `<h4>Your verfication code is ${defaultotp}</h4>`;
      //   // let text = customer.html
      //   // const fs = require("fs");
      //   // const text = fs.readFileSync('./customer.html');
      //   // Read HTML Template
      //   //  let text = fs.readFileSync("customer.htm");
      //   let testAccount = await nodemailer.createTestAccount();
      //   let transporter = nodemailer.createTransport({
      //     host: "smtpout.secureserver.net",
      //     port: 587,
      //     secure: false, // true for 465, false for other ports
      //     auth: {
      //       user: "support@brizebond.com", // generated ethereal user
      //       pass: "Buynaa@02771", // generated ethereal password
      //     },
      //   });
      //   const fs = require("fs");
      //   const text = fs.readFileSync('./customer.html');
      //   let info = await transporter.sendMail({
      //     from: '"Buynaa Support" <support@buynaa.com>', // sender address
      //     to: result.email, // list of receivers
      //     subject: subject, // Subject line
      //     //text:  `<b>${text}</b>`, // plain text body
      //     html: `<b>${text}</b>`, // html body
      //   })
      //   console.log("Message sent: %s", info);
      //   transporter.sendMail(info, function (err, data) {
      //     if (err) {
      //       console.log(err)
      //       console.log('Error Occurs');
      //     }
      //     else {
      //       console.log('Email sent successfully');
      //       res.send("Email sent successfully")
      //     }
      //   });
      // }
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
  // if(username){
  //   data.username = username;
  // }
 // console.log("username",username)
  if (email) {
    data.email = email
  }
  if (display_name) {
    data.display_name = display_name
  }
  if(abt_us){
    data.abt_us = abt_us
  }
  // if (req.files) {
  //   if (req.files.profileImg) {
  //     alluploads = [];
  //     for (let i = 0; i < req.files.profileImg.length; i++) {
  //       // console.log(i);
  //       const resp = await cloudinary.uploader.upload(req.files.profileImg[i].path, {
  //         use_filename: true,
  //         unique_filename: false,
  //       });
  //       fs.unlinkSync(req.files.profileImg[i].path);
  //       alluploads.push(resp.secure_url);
  //     }
  //     // newStore.storeImg = alluploads;
  //     data.profileImg = alluploads;
  //   }
  // }


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
 
const getdetail =  await User.findOne({ username: req.body.username})
//console.log("getdetail",getdetail)

if (getdetail) {
  // resp.alreadyr(res);
  res.status(201).json({
    status:false,
    message : "Username Already Exist"
  })
}else{
  await User.findOneAndUpdate(
    { _id: req.params.id },
    { $set: data ,username:req.body.username},
    { new: true }
  )
    .then((data) => resp.successr(res, data))
    .catch((error) => resp.errorr(res, error));
  }
}
 



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
.sort({ createdAt: -1 }).limit(9)
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
   await Submit.find({aprv_status:"Active"})
  .sort({meteors:-1}).limit(9).populate("userid")
  // .sort({ createdAt: -1 }).limit(6)
   
  .then((data) => resp.successr(res, data))
  .catch((error) => resp.errorr(res, error));
  
   
}


exports.payoutlist = async (req, res) => {
 var getuser =  await User.find()
    .sort({ createdAt: -1 })
    .then((data) => resp.successr(res, data))
    .catch((error) => resp.errorr(res, error));
    
};


exports.payout = async (req, res) => {
  //const getoneuser = await User.findOne({_id: req.params.id })
  // console.log("USER",getoneuser)
  // let getcredit = getoneuser.creaditedAmt
  // console.log("CREDIT AMT",getcredit)

  const getuser = await User.findOne({_id: req.params.id })

const getpay=   await User.findOneAndUpdate(
    { _id: req.params.id },
    { $set: req.body },
    { new: true }
  )
    // .then((data) => resp.successr(res, data))
    // .catch((error) => resp.errorr(res, error));
    const getoneuser = await User.findOne({_id: req.params.id })

   // console.log("USER",getpay)
    let getcredit = getoneuser.remaining
    //let getamt  = getoneuser.creaditedAmt

    console.log("CREDIT AMT",getcredit)
    let remaing = getcredit - req.body.payout
    console.log("remaining",remaing)
if(remaing == 0){
  const getupdate=   await User.findOneAndUpdate(
    { _id: req.params.id },
    { $set: {remaining:remaing,creaditedAmt:0} },
    { new: true }
  )
  .then((data) => resp.successr(res, data))
}else{
const getupdate=   await User.findOneAndUpdate(
    { _id: req.params.id },
    { $set: {remaining:remaing} },
    { new: true }
  )
  .then((data) => resp.successr(res, data))
}
 };


 exports.sendotp = async (req, res) => {
  const defaultotp = Math.ceil(100000 + Math.random() * 900000);
  const { email, mobile } = req.body;
  const http = require("https");

  const options = {
    method: "GET",
    hostname: "api.msg91.com",
    port: null,
    path: `/api/v5/otp?template_id=620deb009f5d151055640942&mobile=91${mobile}&authkey=${process.env.OTPAUTH}`,
    headers: {
      "Content-Type": "application/json",
    },
  };

  const requestmain = http.request(options, function (res) {
    const chunks = [];

    res.on("data", function (chunk) {
      chunks.push(chunk);
    });

    res.on("end", function () {
      const body = Buffer.concat(chunks);
      console.log(body.toString());
    });
  });

  //requestmain.write("{\"OTP\":\"6786\"}");
  requestmain.end();

  const finddetails = await Customer.findOneAndUpdate(
    {
      $or: [{ mobile: mobile }, { email: email }],
    },
    { $set: { otp: defaultotp } },
    { new: true }
  );

  //console.log(mobile_no.length);
  //console.log(finddetails);
  //console.log(finddetails.customer_email);
  if (finddetails) {
    //const {to,text,} = req.body
    const subject = `Buynaa Email Verification`;
    const text = `<h4>Your verfication code is ${defaultotp}</h4>`;

    //Generate test SMTP service account from ethereal.email
    //Only needed if you don't have a real mail account for testing
    let testAccount = await nodemailer.createTestAccount();

    // create reusable transporter object using the default SMTP transport
    let transporter = nodemailer.createTransport({
      host: "smtpout.secureserver.net",
      port: 587,
      secure: false, // true for 465, false for other ports
      auth: {
        user: "support@brizebond.com", // generated ethereal user
        pass: "Buynaa@02771", // generated ethereal password
      },
    });

    // // send mail with defined transport object
    let info = await transporter.sendMail({
      from: '"Buynaa Support" <support@buynaa.com>', // sender address
      to: finddetails.email, // list of receivers
      subject: subject, // Subject line
      text: text, // plain text body
      html: `<b>${text}</b>`, // html body
    })

    console.log("Message sent: %s", info);
    // // Message sent: <b658f8ca-6296-ccf4-8306-87d57a0b4321@example.com>

    // // Preview only available when sending through an Ethereal account
    console.log("Preview URL: %s", nodemailer.getTestMessageUrl(info));
    res.status(200).json({
      status: true,
      msg: "otp send successfully",
      email: email,
      mobile: mobile,
      otp: defaultotp,
    });
  } else {
    res.status(400).json({
      status: false,
      msg: "error occured",
    });
  }
};