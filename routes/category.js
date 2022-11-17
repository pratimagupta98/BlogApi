const express = require("express");
const router = express.Router();
const multer = require("multer");
const fs = require("fs");

const {
    addCategory,
    getallCategory,
    getoneCategory,
    editCategory,
    dltCategory,
    total_category
   
} = require("../controller/category");

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
    { name: "cat_img", maxCount: 1 },
   
    //   { name: "storepan_img", maxCount: 5 },
    
  ]);
  
 
 router.post("/admin/addCategory",multipleUpload, addCategory);
 router.get("/admin/getallCategory", getallCategory);
 router.get("/admin/getoneCategory/:id", getoneCategory);
 router.post("/admin/editCategory/:id",multipleUpload, editCategory);
 router.get("/admin/dltCategory/:id", dltCategory);
 router.get("/admin/total_category", total_category);

module.exports = router;

