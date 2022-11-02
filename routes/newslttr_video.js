const express = require("express")
const router = express.Router()

const {add_Video,getVideo,dlt_video}= require("../controller/newslttr_video")

router.post("/admin/add_Video", add_Video)
router.get("/user/getVideo", getVideo)
router.get("/admin/dlt_video/:id", dlt_video)


module.exports = router