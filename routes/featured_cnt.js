const express = require("express");
const router = express.Router();
const multer = require("multer");
const fs = require("fs");

const {
    add_feature_cnt,
    get_featured_cnt,
    getoneSubCategory,
    editSubCategory,
    dltSubCategory
   
} = require("../controller/featured_cnt");

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
    { name: "thumbnail_img", maxCount: 1 },
   
    //   { name: "storepan_img", maxCount: 5 },
    
  ]);
  
 
 
 router.post("/admin/add_feature_cnt",multipleUpload, add_feature_cnt);
  router.get("/user/get_featured_cnt", get_featured_cnt);
//  router.get("/admin/getoneSubCategory/:id", getoneSubCategory);
//  router.post("/admin/editSubCategory/:id",multipleUpload, editSubCategory);
//  router.get("/admin/dltSubCategory/:id", dltSubCategory);

module.exports = router;

