const express = require("express")
const router = express.Router()

const {add_Video,getVideo}= require("../controller/newslttr_video")

router.post("/admin/add_Video", add_Video)
router.get("/user/getVideo", getVideo)
 

module.exports = router