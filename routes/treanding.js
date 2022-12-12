const express = require("express");
const router = express.Router();
 

const {
    addTrending,
    getTrending,
    getoneTrending,
    editTrending,
    dltTrending
} = require("../controller/treanding");



router.post("/admin/addTrending", addTrending);
router.get("/admin/getTrending", getTrending);
router.get("/admin/getoneTrending/:id",  getoneTrending)
router.post("/admin/editTrending/:id",  editTrending);
router.get("/admin/dltTrending/:id",  dltTrending);


module.exports = router;

