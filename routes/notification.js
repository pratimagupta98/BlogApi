const express = require("express");
const router = express.Router();
const multer = require("multer");
const fs = require("fs");


const {
    add_notification,
    get_notification,
    dlt_notification,
    getone_notification,
    edit_notification
} = require("../controller/notification");

 
  
 
 
 router.post("/admin/add_notification", add_notification);
router.get("/admin/get_notification", get_notification);
router.get("/admin/getone_notification/:id", getone_notification);
router.post("/admin/edit_notification/:id", edit_notification);

router.get("/admin/dlt_notification/:id", dlt_notification);


module.exports = router;
 