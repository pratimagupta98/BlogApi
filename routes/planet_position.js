const express = require("express");
const router = express.Router();
 

const {
    add_planet_position,user_planet_position
   
} = require("../controller/planet_position.js");

 
 
 router.post("/admin/add_planet_position", add_planet_position);
 router.get("/user/user_planet_position", user_planet_position);
// // router.get("/admin/getoneContactus/:id",     getoneContactus)
//  router.post("/user/dis_book_mark/:id",     dis_book_mark);
// //router.get("/admin/dltmany",     dltmany)
// router.get("/user/getone_mylikes/:userid/:submitresrcId",getone_mylikes);


module.exports = router;

