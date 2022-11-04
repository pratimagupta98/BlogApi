const express = require("express");
const router = express.Router();
 

const {
    addFAQ,
    faq_list,
    editprofile,
    dltFaq,
    getone_faqlist
   
} = require("../controller/faq");

 
 
 router.post("/admin/addFAQ", addFAQ);
router.get("/admin/faq_list", faq_list);
router.get("/admin/dltFaq/:id", dltFaq);
router.get("/admin/getone_faqlist/:id", getone_faqlist);


module.exports = router;

