const express = require("express");
const router = express.Router();
 

const {
    add_Comment,
    comment_list,
    admin_comment_list,
    getone_coment_list,
    admin_edit_coment,
    dlt_Coment
} = require("../controller/comments");

 
 
 router.post("/user/add_Comment", add_Comment);
 router.get("/user/comment_list", comment_list);
 router.get("/admin/admin_comment_list", admin_comment_list);
router.get("/admin/getone_coment_list/:id", getone_coment_list);
// router.get("/admin/getoneContactus/:id",     getoneContactus)
 router.post("/admin/admin_edit_coment/:id", admin_edit_coment);
 router.get("/admin/dlt_Coment/:id",     dlt_Coment)


module.exports = router;

