const Admin = require("../models/admin");
const resp = require("../helpers/apiResponse");
const bcrypt = require("bcryptjs");
const cloudinary = require("cloudinary").v2;
    const fs = require("fs");
    const jwt = require("jsonwebtoken");
    const key = "verysecretkey";

exports.addAdmin = async (req, res) => {
    const { name,email,password,cnfmPassword, adminimg,   } =
      req.body;
  
    const salt = await bcrypt.genSalt(10);
    const hashPassword = await bcrypt.hash(password, salt);
  
    
    const newAdmin = new Admin({
      name: name,
      email: email,
      password: hashPassword,
      cnfmPassword: hashPassword,
      adminimg: adminimg,
    });
  
    const findexist = await Admin.findOne({ email: email })
    
    if (findexist) {
      resp.alreadyr(res);
    } else {
      if (req.files) {
        if (req.files.adminimg[0].path) {
          alluploads = [];
          for (let i = 0; i < req.files.adminimg.length; i++) {
            const resp = await cloudinary.uploader.upload(
              req.files.adminimg[i].path,
              { use_filename: true, unique_filename: false }
            );
            fs.unlinkSync(req.files.adminimg[i].path);
            alluploads.push(resp.secure_url);
          }
          newAdmin.adminimg = alluploads;
        }
      }
      newAdmin.save()
  
  
        .then((data) => resp.successr(res, data))
        .catch((error) => resp.errorr(res, error));
    };
  }


  exports.adminlogin = async (req, res) => {
    const { email, password } = req.body;
    const admin = await Admin.findOne({ email: email
    });
    if (admin) {
      const validPass = await bcrypt.compare(password, admin.password);
      if (validPass) {
        const token = jwt.sign(
          {
            adminId: admin._id,
          },
          key,
          {
            expiresIn: 86400000,
          }
        );
        res.header("ad-token", token).status(200).send({
          status: true,
          token: token,
          msg: "success",
          data: admin,
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
        msg: "admin Doesnot Exist",
        error: "error",
      });
    }
  };
  
  exports.viewoneadmin = async (req, res) => {
    await Admin.findOne({ _id: req.params.id })
      .then((data) => resp.successr(res, data))
      .catch((error) => resp.errorr(res, error));
  };
  
  exports.editAdmin = async (req, res) => {
    const { name, email, mobile, password, cnfmPassword } = req.body;
    // const salt = await bcrypt.genSalt(10);
    // const hashPassword = await bcrypt.hash(password, salt);
    data = {};
    if (name) {
      data.name = name;
    }
    if (email) {
      data.email = email;
    }
    if (mobile) {
      data.mobile = mobile;
    }
  
    if (password) {
      const salt = await bcrypt.genSalt(10);
      let hashPassword = await bcrypt.hash(password, salt);
      data.password = hashPassword;
    }
    if (cnfmPassword) {
      const salt = await bcrypt.genSalt(10);
      let hashPassword = await bcrypt.hash(password, salt);
      data.cnfmPassword = hashPassword;
    }
    if (req.files) {
      if (req.files.adminimg) {
        alluploads = [];
        for (let i = 0; i < req.files.adminimg.length; i++) {
          // console.log(i);
          const resp = await cloudinary.uploader.upload(req.files.adminimg[i].path, {
            use_filename: true,
            unique_filename: false,
          });
          fs.unlinkSync(req.files.adminimg[i].path);
          alluploads.push(resp.secure_url);
        }
        // newStore.storeImg = alluploads;
        data.adminimg = alluploads;
      }
   }
    await Admin.findOneAndUpdate(
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
  
      exports.chngpass = async (req, res) => {
        const {oldPass,password,cnfmPassword } = req.body;
        const admin = await Admin.findOne({_id:req.params.id });
        if (admin) {
          console.log(admin)
          const validPass = await bcrypt.compare(req.body.oldPass,password, admin.password);
          console.log("String",validPass)
          if (validPass) {
           
  
            if(password === cnfmPassword){
              const salt = await bcrypt.genSalt(10);
              let hashPassword = await bcrypt.hash(password, salt); 
       
             const findandUpdateEntry = await Admin.findOneAndUpdate(
               {
             _id: req.params.id
               },
               { $set: { password: hashPassword ,cnfmPassword:hashPassword} },
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
           }else{
             res.status(400).json({
               status: false,
               msg: "error",
               error: "Password not matched",
           })
         }
           };
        
        
            
          }
        }