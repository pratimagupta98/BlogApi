const express = require("express")
const router = express.Router()

const {addcity,editcity,allYear,onecity,deletecity}= require("../controller/year")

// router.post("/admin/addcity", addcity)
// router.post("/admin/editcity/:id", editcity)
router.get("/user/allYear", allYear)
// router.get("/admin/onecity/:id", onecity)
// router.delete("/admin/deletecity/:id", deletecity)
//
module.exports = router