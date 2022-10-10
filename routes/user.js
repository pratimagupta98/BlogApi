const express = require("express");
const router = express.Router();
 

const {
    signup,
    login,
    updateProfile
  
} = require("../controller/user");



router.post("/user/signup", signup);
router.post("/user/login", login);
router.post("/user/updateProfile/:id", updateProfile);



module.exports = router;

