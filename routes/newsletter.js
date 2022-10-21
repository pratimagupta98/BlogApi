const express = require("express")
const router = express.Router()

const {add_news_ltr,get_new_list,getone_news_ltr,edit_news_ltr,dlt_news_ltr}= require("../controller/newsletter")

router.post("/user/add_news_ltr", add_news_ltr)
router.post("/admin/edit_news_ltr/:id", edit_news_ltr)
router.get("/admin/get_new_list", get_new_list)
 router.get("/admin/getone_news_ltr/:id", getone_news_ltr)
router.delete("/admin/dlt_news_ltr/:id", dlt_news_ltr)

module.exports = router