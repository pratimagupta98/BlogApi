const express = require("express");
const router = express.Router();
const multer = require("multer");
const fs = require("fs");

const {
    signup,
    login,
    updateProfile,
    getoneUser,
    userlist,
    dltUser,
    user_aprv_sts,
    total_user,
    karma_crrnt_month,
    all_time_karma,
    payoutlist
  
} = require("../controller/user");

const storage = multer.diskStorage({
    destination: function (req, file, cb) {
      //console.log(file);
      let path = `./uploads`;
      if (!fs.existsSync("uploads")) {
        fs.mkdirSync("uploads");
      }
      cb(null, path);
    },
    filename: function (req, file, cb) {
      cb(null, file.originalname);
    },
  });
  
  const fileFilter = (req, file, cb) => {
    if (
      file.mimetype.includes("jpeg") ||
      file.mimetype.includes("png") ||
      file.mimetype.includes("jpg") ||
       file.mimetype.includes("pdf")
    ) {
      cb(null, true);
    } else {
      cb(null, false);
    }
  };
  
  let uploads = multer({ storage: storage });
  
  let multipleUpload = uploads.fields([
    { name: "profileImg", maxCount: 1 },
   
    //   { name: "storepan_img", maxCount: 5 },
    //   { name: "tradelicence_img", maxCount: 5 },
    //   { name: "companypan_img", maxCount: 5 },
    //   { name: "address_proof_img", maxCount: 5 },
  ]);
  

router.post("/user/signup", signup);
router.post("/user/login", login);
router.post("/user/updateProfile/:id",multipleUpload, updateProfile);
router.get("/user/getoneUser/:id", getoneUser);
router.get("/admin/userlist", userlist);

router.get("/admin/dltUser/:id", dltUser);
router.post("/admin/user_aprv_sts/:id", user_aprv_sts);
router.get("/admin/total_user", total_user);
router.get("/user/karma_crrnt_month", karma_crrnt_month);
router.get("/user/all_time_karma", all_time_karma);
router.get("/user/payoutlist", payoutlist);





module.exports = router;

