const express = require("express")
const router = express.Router()

const {addcity,editcity,allLang,onecity,deletecity}= require("../controller/language")

// router.post("/admin/addcity", addcity)
// router.post("/admin/editcity/:id", editcity)
router.get("/user/allLang", allLang)
 router.get("/admin/onecity/:id", onecity)
// router.delete("/admin/deletecity/:id", deletecity)
//
module.exports = router