const express = require("express");
const router = express.Router();
const submitRsrcModel = require("../models/submit_resrc");

router.get("/resources/:category/:subcategory", async (req, res) => {
  try {
    const { category, subcategory } = req.params;

    const resources = await submitRsrcModel
      .find({ category, sub_category: subcategory })
      .populate("category", "name")
      .populate("sub_category", "name")
      .populate("language", "name")
      .populate("relYear", "year")
      .lean();

    res.json(resources);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Server Error" });
  }
});

module.exports = router;
