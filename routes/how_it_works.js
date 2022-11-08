const express = require("express");
const router = express.Router();
 

const {
    how_it_works,
    get_howWorks,
    getone_howWorks,
    edit_howWorks,
    dlt_howWorks
} = require("../controller/how_it_works");



router.post("/admin/how_it_works", how_it_works);
router.get("/admin/get_howWorks", get_howWorks);
router.get("/admin/getone_howWorks/:id",  getone_howWorks)
router.post("/admin/edit_howWorks/:id",  edit_howWorks);
router.get("/admin/dlt_howWorks/:id",  dlt_howWorks);


module.exports = router;

