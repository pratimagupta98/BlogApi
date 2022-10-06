const express = require("express");
const router = express.Router();
 

const {
    addSubCategory,
    getallSubCategory,
    getoneSubCategory,
    editSubCategory,
    dltSubCategory
   
} = require("../controller/subcategory");

 
 
 router.post("/admin/addSubCategory", addSubCategory);
 router.get("/admin/getallSubCategory", getallSubCategory);
 router.get("/admin/getoneSubCategory/:id", getoneSubCategory);
 router.post("/admin/editSubCategory/:id", editSubCategory);
 router.get("/admin/dltSubCategory/:id", dltSubCategory);

module.exports = router;

