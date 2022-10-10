const express = require("express");
const router = express.Router();
const multer = require("multer");
const fs = require("fs");


const {
    addAdmin,
    adminlogin,
    editAdmin,
    viewoneadmin,
    chngpass
 
} = require("../controller/admin");

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
  { name: "adminimg", maxCount: 1 },
 
  //   { name: "storepan_img", maxCount: 5 },
   
]);

//PATHS

router.post("/admin/addAdmin", multipleUpload, addAdmin);
router.post("/admin/editAdmin/:id", multipleUpload, editAdmin);
router.get("/admin/viewoneadmin/:id", multipleUpload, viewoneadmin);

router.post("/admin/chngpass/:id", chngpass);

router.post("/admin/adminlogin", adminlogin);
module.exports = router;
 