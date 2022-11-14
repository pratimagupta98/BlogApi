const express = require("express");
const router = express.Router();
 

const {
    add_like,
    my_likes,
    getoneContactus,
    dislike,
    dltContactus
} = require("../controller/like");

 
 
 router.post("/user/add_like", add_like);
router.get("/user/my_likes/:id", my_likes);
// router.get("/admin/getoneContactus/:id",     getoneContactus)
 router.get("/user/dislike/:id",     dislike);
// router.get("/admin/dltContactus/:id",     dltContactus)


module.exports = router;

