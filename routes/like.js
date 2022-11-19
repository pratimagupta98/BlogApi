const express = require("express");
const router = express.Router();
 

const {
    add_like,
    my_likes,
    getoneContactus,
    dis_book_mark,
    dltContactus,
   // dltmany
} = require("../controller/like");

 
 
 router.post("/user/add_like", add_like);
router.get("/user/my_likes/:id", my_likes);
// router.get("/admin/getoneContactus/:id",     getoneContactus)
 router.post("/user/dis_book_mark/:id",     dis_book_mark);
//router.get("/admin/dltmany",     dltmany)


module.exports = router;

