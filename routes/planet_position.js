const express = require("express");
const router = express.Router();
const multer = require("multer");
const fs = require("fs");

const {
    add_planet_position,user_planet_position,edit_planet_position,all_time_karma
   
} = require("../controller/planet_position.js");

 
const storage = multer.diskStorage({
    destination: function (req, file, cb) {
      //console.log(file);
      let path = `./uploads`;
      if (!fs.existsSync("uploads")) {
        fs.mkdirSync("uploads");
      }
      cb(null, path);
    },
    filename: function (req, file, cb) {
      cb(null, file.originalname);
    },
  });
  
  const fileFilter = (req, file, cb) => {
    if (
      file.mimetype.includes("jpeg") ||
      file.mimetype.includes("png") ||
      file.mimetype.includes("jpg") ||
       file.mimetype.includes("pdf")
    ) {
      cb(null, true);
    } else {
      cb(null, false);
    }
  };
  
  let uploads = multer({ storage: storage });
  
  
  
 
 
 router.post("/admin/add_planet_position",uploads.single("img"), add_planet_position);
 router.get("/user/user_planet_position", user_planet_position);
 router.post("/admin/edit_planet_position/:id",edit_planet_position)
//  router.post("/user/dis_book_mark/:id",     dis_book_mark);
// //router.get("/admin/dltmany",     dltmany)
// router.get("/user/getone_mylikes/:userid/:submitresrcId",getone_mylikes);
router.get("/user/all_time_karma", all_time_karma);


module.exports = router;

