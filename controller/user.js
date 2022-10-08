
const User = require("../models/user");
const resp = require("../helpers/apiResponse");
const bcrypt = require("bcryptjs");
const cloudinary = require("cloudinary").v2;
 const key = "verysecretkey"; 

exports.signup = async (req, res) => {
    const {
      username,
      email,
       
      password,
      
    } = req.body;
  
    const salt = await bcrypt.genSalt(10);
    const hashPassword = await bcrypt.hash(password, salt);
   
    
    const newuser = new User({
        username: username,
      email: email,
     
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