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
  
  const { google } = require('googleapis');

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


// exports.signup = async (req, res) => {
//   const defaultotp = Math.ceil(100000 + Math.random() * 900000);
//     const {
//       username,
//       email,
//       status,
//       password,
      
//     } = req.body;
  
//     const salt = await bcrypt.genSalt(10);
//     const hashPassword = await bcrypt.hash(password, salt);
   
    
//     const newuser = new User({
//         username: username,
//       email: email,
//       status,status,
//       password: hashPassword,
    
//     });
  
//     const findexist = await User.findOne({$or:[{
//    email: email },{username: username }]}
//     )
//     if (findexist) {
//       resp.alreadyr(res);
//     } else {
//       const subject = `Hello from Brahmaand Space`;
//       const text = `<h4>Your verfication code is ${defaultotp}</h4>`;
//       // let text = customer.html
//       // const fs = require("fs");
//       // const text = fs.readFileSync('./customer.html');
//       // Read HTML Template
//       //  let text = fs.readFileSync("customer.htm");
//       const oAuth2Client = new google.auth.OAuth2(
//         process.env.CLIENT_ID,
//         process.env.CLEINT_SECRET,
//         process.env.REDIRECT_URI
//     );
//     oAuth2Client.setCredentials({ refresh_token: process.env.REFRESH_TOKEN });
//     const accessToken = await oAuth2Client.getAccessToken();

//       let testAccount = await nodemailer.createTestAccount();
//       let transporter = nodemailer.createTransport({
//         auth: {
//           type: 'OAuth2',
//           user: 'contactus@brahmaand.space',
//           clientId: process.env.CLIENT_ID,
//           clientSecret: process.env.CLEINT_SECRET,
//           refreshToken: process.env.REFRESH_TOKEN,
//           accessToken: accessToken,
//       },
//       });
      
//       let info = await transporter.sendMail({
//         from: 'SENDER NAME <contactus@brahmaand.space>',
//                 to: req.body.to,
//                 subject: subject, // Subject line
//     text: text, // plain text body
//     html: `<b>${text}</b>`, // html body
//       })
//       console.log("Message sent: %s", info);
//       // // Message sent: <b658f8ca-6296-ccf4-8306-87d57a0b4321@example.com>
  
//       // // Preview only available when sending through an Ethereal account
//       console.log("Preview URL: %s", nodemailer.getTestMessageUrl(info));
//       newuser
//       .save()
//       .then((result) => {
//         res.status(200).json({
//           status: true,
//           msg: "otp send successfully",
//           email: email,
//           //mobile: mobile,
//           otp: defaultotp,
//         });
//           }
//       ).catch((err)=>{
//         console.log("error")
//         return err;
//       })
        
//      // console.log('Email sent...', result)
//      // )
//   // . catch (error) {
//   //     return error;
//   // }
    
//     //   async function sendMail() {
//     //     try {
//     //         const accessToken = await oAuth2Client.getAccessToken();
    
//     //         const transport = nodemailer.createTransport({
//     //             service: 'gmail',
//     //             auth: {
//     //                 type: 'OAuth2',
//     //                 user: 'contactus@brahmaand.space',
//     //                 clientId: CLIENT_ID,
//     //                 clientSecret: CLEINT_SECRET,
//     //                 refreshToken: REFRESH_TOKEN,
//     //                 accessToken: accessToken,
//     //             },
//     //         });
//     //         console.log("transport",transport)
    
//     //         const mailOptions = {
//     //             from: 'SENDER NAME <contactus@brahmaand.space>',
//     //             to: 'pratimadevelopersveltosest@gmail.com',
//     //             subject: 'Hello from gmail using API',
//     //             text: 'Hello from gmail email using API',
//     //             html: '<h1>Hello from gmail email using API</h1>',
//     //         };
    
//     //         const result =await transport.sendMail(mailOptions);
//     //         //return result;
//     //         sendMail()
//     //         .then((result) => {
//     //             res.status(200).json({
//     //                 status:true,
//     //                 msg:"success",
//     //                 data :result
//     //             })
//     //         }
//     //        // console.log('Email sent...', result)
//     //         )
//     //     } catch (error) {
//     //         return error;
//     //     }
    
    
//     // // sendMail()
//     // //     .then((result) => {
//     // //         res.status(200).json({
//     // //             status:true,
//     // //             msg:"success",
//     // //             data :result
//     // //         })
//     // //     }
//     // //    // console.log('Email sent...', result)
//     // //     )
//     // //     .catch((error) => {
//     // //         res.status(200).json({
//     // //             status:false,
//     // //             msg:"success",
//     // //             data :error.message
//     // //         })
//     // //     }
//     // //     //console.log(error.message)
//     // //     );
//     // }

      
//     // }
//   };
// }

  exports.login = async (req, res) => {
    const {  email, password,username } = req.body;
    const user = await User.findOne( {   
    //  $or: [{ email: email }, { username: username }],
      $and: [

        { $or: [{ email: email }, { username: username }] }, { $or: [{status:"true" }] }
      ]

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


  

exports.forgetPassword = async (req, res) => {

  const { password, cnfrmPassword } = req.body

  //  const salt = await bcrypt.genSalt(10);
  //  const hashPassword = await bcrypt.hash(password, salt);
  //  const hashPassword1 = await bcrypt.hash(cnfrmPassword, salt)

  // const validPass = String.compare(req.body.password, req.body.cnfrmPassword);
  // console.log("Result",validPass)
  if (password === cnfrmPassword) {


    const salt = await bcrypt.genSalt(10);
    const hashPassword = await bcrypt.hash(password, salt);

    const findandUpdateEntry = await Customer.findOneAndUpdate(
      {
        _id: req.userId
      },
      { $set: { password: hashPassword, cnfrmPassword: hashPassword } },
      { new: true }
    );
    if (findandUpdateEntry) {
      res.status(200).json({
        status: true,
        msg: "success",
        data: findandUpdateEntry,
      });
    } else {
      res.status(400).json({
        status: false,
        msg: "error",
        error: "error",
      });
    }
  } else {
    res.status(400).json({
      status: false,
      msg: "error",
      error: "Password not matched",
    })
  }
};


exports.resetPassword = async (req, res) => {
  const { oldpassword ,password, cnfrmPassword } = req.body
  const userData = await User.findOne({_id : req.params.id})
  if(userData){
  const passwordMatch = await bcrypt.compare(oldpassword,userData.password)
  if(passwordMatch){

    console.log("matched")
    if(password === cnfrmPassword){
      const salt = await bcrypt.genSalt(10);
    const hashPassword = await bcrypt.hash(password, salt);
    const findandUpdateEntry = await User.findOneAndUpdate(
          {
            _id: req.params.id
          },
          { $set: { password: hashPassword, cnfrmPassword: hashPassword } },
          { new: true }
        );
        if (findandUpdateEntry) {
          res.status(200).json({
            status: true,
            msg: "success",
            data: findandUpdateEntry,
          });
        } 
    }else {
      res.status(401).json({
        status: false,
        msg: "Password confirm password not matched"
        
      });
    }
  }else{
    res.status(400).json({
          status: false,
          msg: "Old Password not matched",
         
        })
      }
  
  }
};


exports.signup = async (req,res) =>{


  const defaultotp = Math.ceil(1000 + Math.random() * 9000);
    const {
      username,
      email,
      status,
      password,
      
    } = req.body;
  
    // const salt = await bcrypt.genSalt(10);
    // const hashPassword = await bcrypt.hash(password, salt);
   
    
    const newuser = new User({
        username: username,
      email: email,
      status,status,
      password: password,
      otp:defaultotp
    
    });
  
    const findexist = await User.findOne({
      // $or:[{
      // email: email },{username: username }]
      $and: [

        { $or: [{ email: email }, { username: username }] }, { $and: [{status:"true" }] }
      ]
    }
       )
       if (findexist) {
         resp.alreadyr(res);
       } else {
const oAuth2Client = new google.auth.OAuth2(
  process.env.CLIENT_ID,
  process.env.CLEINT_SECRET,
  process.env.REDIRECT_URI
);
oAuth2Client.setCredentials({ refresh_token: process.env.REFRESH_TOKEN });
async function sendMail() {
  try {
    const accessToken = await oAuth2Client.getAccessToken();
    const subject = `Hello from Brahmaand Space`;
    const text = `<h4>Your verfication code is ${defaultotp}</h4>`;
    const transport = nodemailer.createTransport({
                  service: 'gmail',
                  auth: {
                      type: 'OAuth2',
                      user: 'contactus@brahmaand.space',
                      clientId: process.env.CLIENT_ID,
                      clientSecret: process.env.CLEINT_SECRET,
                      refreshToken: process.env.REFRESH_TOKEN,
                      accessToken: process.env.accessToken,
                  },
              });
              console.log("transport",transport)
      
              const mailOptions = {
                from: '<b>contactus@brahmaand.space</b>',
                  to:  req.body.email,
                  subject: 'Hello from gmail using API',
                  subject: `<b>${subject}b>`, // Subject line
                  text: `<b>${text}</b>`, // plain text body
                  html: `<b>${text}</b>`, // html body
                  // text: 'Hello from gmail email using API',
                  // html: '<h1>Hello from gmail email using API</h1>',
              };

    const result = await transport.sendMail(mailOptions);
    return result;
    
  } catch (error) {
    return error;
  }
}

sendMail()
  newuser.save()
  .then(async(data)=> {
  
    const salt = await bcrypt.genSalt(10);
    const hashPassword = await bcrypt.hash(password, salt);
   
     //  newuser.password = await bcrypt.hash(password, salt);
   console.log("PASS", newuser.password = hashPassword)
    newuser.save().hashPassword
//  savepass =newuser.password
//  newuser.savepass =hashPassword
    res.status(200).json({
      status: true,
      msg: "otp send successfully",
      username:data.username,
      email: data.email,
      mobile: data.mobile,
      otp: defaultotp,
    })
  })
  .catch((error) => resp.errorr(res, error))
 // console.log('Email sent...', result
  
  // )
 // .catch((error) => console.log(error.message));
}
}

exports.verifyotp = async (req, res) => {
  const { email, otp } = req.body;
  const getuser = await User.findOne({ email: email })
 // console.log("getuser",getuser)
  if (getuser) {
    //console.log("user")
    if (req.body.otp == getuser.otp) {
      console.log("sucess")
//************* 
const oAuth2Client = new google.auth.OAuth2(
  process.env.CLIENT_ID,
  process.env.CLEINT_SECRET,
  process.env.REDIRECT_URI
);
oAuth2Client.setCredentials({ refresh_token: process.env.REFRESH_TOKEN });
async function sendMail() {
  try {
    const accessToken = await oAuth2Client.getAccessToken();
    const subject = `Hello from Brahmaand Space`;
    const text = `<h4> ${getuser.username} You Successful Register</h4>`;
    const transport = nodemailer.createTransport({
                  service: 'gmail',
                  auth: {
                      type: 'OAuth2',
                      user: 'contactus@brahmaand.space',
                      clientId: process.env.CLIENT_ID,
                      clientSecret: process.env.CLEINT_SECRET,
                      refreshToken: process.env.REFRESH_TOKEN,
                      accessToken: process.env.accessToken,
                  },
              });
              console.log("transport",transport)
      
              const mailOptions = {
                  from: '<b>contactus@brahmaand.space</b>',
                  to:  req.body.email,
                //  subject: 'Hello from gmail using API',
                  subject: `<b>${subject}</b>`, // Subject line
                  text: `<b>${text}</b>`, // plain text body
                  html: `<b>${text}</b>`, // html body
                  // text: 'Hello from gmail email using API',
                  // html: '<h1>Hello from gmail email using API</h1>',
              };

    const result = await transport.sendMail(mailOptions);
    return result;
    
  } catch (error) {
    return error;
  }
}

sendMail()
.then((result) => console.log('Email sent...', result))
.catch((error) => console.log(error.message));
      //#############
      res.status(200).json({
        status:true,
        msg:"verification successful",
        _id:getuser._id,
        username:getuser.username,
        email:getuser.email
      })
      await User.findOneAndUpdate(
        {
          _id: getuser._id,
        },
        { $set: { status: "true" } },
        { new: true })
      //   .then((data)=>{ 
      // res.status(200).send({
      //   status: true,
      //   msg: "otp verified",
      //   otp: otp,
      //   _id: getuser._id,
      //   mobile:getuser.mobile
      // })
     // });
    } else {
      res.status(201).json({
        status: false,
        msg: "Incorrect Otp",
      });
    }
  }else{
    res.status(400).json({
      status:false,
      msg:"error"
    })
  }

}



exports.sendotp = async (req,res) =>{
const {email,username} = req.body

  const defaultotp = Math.ceil(1000 + Math.random() * 9000);
 
  
    const findexist = await User.findOne({
      // $or:[{
      // email: email },{username: username }]
      $and: [

        { $or: [{ email: email }, { username: username }] }, { $and: [{status:"true" }] }
      ]
    }
       )
        if (findexist) {
      //    resp.alreadyr(res);
      //  } else {
const oAuth2Client = new google.auth.OAuth2(
  process.env.CLIENT_ID,
  process.env.CLEINT_SECRET,
  process.env.REDIRECT_URI
);
oAuth2Client.setCredentials({ refresh_token: process.env.REFRESH_TOKEN });
async function sendMail() {
  try {
    const accessToken = await oAuth2Client.getAccessToken();
    const subject = `Hello from Brahmaand Space`;
    const text = `<h4>Your verfication code is ${defaultotp}</h4>`;
    const transport = nodemailer.createTransport({
                  service: 'gmail',
                  auth: {
                      type: 'OAuth2',
                      user: 'contactus@brahmaand.space',
                      clientId: process.env.CLIENT_ID,
                      clientSecret: process.env.CLEINT_SECRET,
                      refreshToken: process.env.REFRESH_TOKEN,
                      accessToken: process.env.accessToken,
                  },
              });
              console.log("transport",transport)
      
              const mailOptions = {
                from: '<b>contactus@brahmaand.space</b>',
                  to:  req.body.email,
                  subject: 'Hello from gmail using API',
                  subject: `<b>${subject}b>`, // Subject line
                  text: `<b>${text}</b>`, // plain text body
                  html: `<b>${text}</b>`, // html body
                  // text: 'Hello from gmail email using API',
                  // html: '<h1>Hello from gmail email using API</h1>',
              };

    const result = await transport.sendMail(mailOptions);
    return result;
    
  } catch (error) {
    return error;
  }
}

sendMail()
 // newuser.save()
  .then(async(data)=> {
  
    // const salt = await bcrypt.genSalt(10);
    // const hashPassword = await bcrypt.hash(password, salt);
   
     //  newuser.password = await bcrypt.hash(password, salt);
  // console.log("PASS", newuser.password = hashPassword)
  //  newuser.save().hashPassword
//  savepass =newuser.password
//  newuser.savepass =hashPassword
    res.status(200).json({
      status: true,
      msg: "otp send successfully",
      username:data.username,
      email: data.email,
      mobile: data.mobile,
      otp: defaultotp,
    })

    const finddetails = await User.findOneAndUpdate(
      {
        $or: [{ email: email },{ username: username }],
      },
      { $set: { otp: defaultotp } },
      { new: true }
    );
  
  })
  .catch((error) => {
    res.status(400).json({
      status:false,
      error :"error"
    })
  })
  //resp.errorr(res, error))
 // console.log('Email sent...', result
  
  // )
 // .catch((error) => console.log(error.message));
}else{
  res.status(400).json({
    status:false,
    msg :"user does't exist"
  })
}
}

exports.forgetpassword = async (req, res) => {

  const { password } = req.body

  //  const salt = await bcrypt.genSalt(10);
  //  const hashPassword = await bcrypt.hash(password, salt);
  //  const hashPassword1 = await bcrypt.hash(cnfrmPassword, salt)

  // const validPass = String.compare(req.body.password, req.body.cnfrmPassword);
  // console.log("Result",validPass)
  if (password === password) {


    const salt = await bcrypt.genSalt(10);
    const hashPassword = await bcrypt.hash(password, salt);

    const findandUpdateEntry = await User.findOneAndUpdate(
      {
        _id: req.params.id
      },
      { $set: { password: hashPassword } },
      { new: true }
    );
    if (findandUpdateEntry) {
      res.status(200).json({
        status: true,
        msg: "success",
        data: findandUpdateEntry,
      });
    } else {
      res.status(400).json({
        status: false,
        msg: "error",
        error: "error",
      });
    }
  } else {
    res.status(400).json({
      status: false,
      msg: "error",
      error: "Password not matched",
    })
  }
};
