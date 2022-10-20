const express = require("express");
const router = express.Router();
const multer = require("multer");
const fs = require("fs");

const {
    addSub_resrc,
    admin_Sub_resrc,
    sub_res_lsit,
    getone_reslist,
    edit_submit_rsrc,
    dlt_subres_list
   
} = require("../controller/submit_resrc");

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
    { name: "img", maxCount: 1 },
   
    //   { name: "storepan_img", maxCount: 5 },
    
  ]);
  
 
 router.post("/user/addSub_resrc",multipleUpload, addSub_resrc);
 router.post("/user/admin_Sub_resrc",multipleUpload, admin_Sub_resrc);

 router.get("/admin/sub_res_lsit", sub_res_lsit);
 router.get("/admin/getone_reslist/:id", getone_reslist);
 router.post("/admin/edit_submit_rsrc/:id",multipleUpload, edit_submit_rsrc);
 router.get("/admin/dlt_subres_list/:id", dlt_subres_list);

module.exports = router;

