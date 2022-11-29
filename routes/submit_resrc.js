const express = require("express");
const router = express.Router();
const multer = require("multer");
const fs = require("fs");

const {
    addSub_resrc,
    admin_Sub_resrc,
    user_sub_res_lsit,
    admin_sub_res_lsit,
    getone_reslist,
    edit_submit_rsrc,
    dlt_subres_list,
    approve_submit_resrc,
    listbycategory,
    listbysubcategory,
    Promotions,
    total_sub_resrc,
    total_paid_resrc,
    total_free_resrc,
    getone_submitresrc_list,
    my_content_meteros,
    App_Sub_resrc,
    filter_type,
    filterbypaid_subresrc,
    filterbyFormat
   
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
  
 
 router.post("/user/addSub_resrc",uploads.single("img"), addSub_resrc);
 router.post("/user/App_Sub_resrc",uploads.single("img"), App_Sub_resrc);

 router.post("/admin/admin_Sub_resrc",uploads.single("img"), admin_Sub_resrc);

 router.get("/user/user_sub_res_lsit", user_sub_res_lsit);
 router.get("/admin/admin_sub_res_lsit", admin_sub_res_lsit);

 router.get("/admin/getone_reslist/:id", getone_reslist);
  router.post("/admin/edit_submit_rsrc/:id",multipleUpload, edit_submit_rsrc);
 router.get("/admin/dlt_subres_list/:id", dlt_subres_list);
 router.post("/admin/approve_submit_resrc/:id", approve_submit_resrc);
 router.get("/admin/listbycategory/:id", listbycategory);
 router.get("/admin/listbysubcategory/:id", listbysubcategory);
 router.get("/user/Promotions", Promotions);
 router.get("/admin/total_sub_resrc", total_sub_resrc);
 router.get("/admin/total_paid_resrc", total_paid_resrc);

 router.get("/admin/total_free_resrc", total_free_resrc);
// router.get("/user/getone_submitresrc_list", getone_submitresrc_list);
router.get("/user/my_content_meteros/:id", my_content_meteros);
router.get("/user/filter_type/:id", filter_type);
router.get("/user/filterbyFormat/:id", filterbyFormat);


 
 
module.exports = router;




