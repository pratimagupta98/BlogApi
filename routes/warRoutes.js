const express = require("express");
const router = express.Router();
const warModel = require("../models/war");

//  Task No. 4 -> GET endpoint for retrieving the home page war
router.get("/homepage/war", async (req, res) => {
    try {
      const homePageWar = await warModel.findOne({ status: "HOME_PAGE" }).exec();
  
      res.json(homePageWar);
    } catch (error) {
      console.error(error);
      res.status(500).json({ message: "Server Error" });
    }
});

// POST endpoint for creating a war between two resources
router.post("/war", async (req, res) => {
  try {
    const { res1, res2, warid, status } = req.body;

    const newWar = new warModel({
      res1,
      res2,
      warid,
      status,
    });

    const createdWar = await newWar.save();

    res.json(createdWar);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Server Error" });
  }
});

// GET endpoint for retrieving all wars in a paginated manner
router.get("/wars", async (req, res) => {
    try {
      const page = parseInt(req.query.page) || 1; // Get the page number from query parameter, default to 1
      const limit = parseInt(req.query.limit) || 10; // Get the limit (number of wars per page) from query parameter, default to 10
  
      const startIndex = (page - 1) * limit;
      const endIndex = page * limit;
  
      const results = {};
  
      const count = await warModel.countDocuments().exec();
      results.totalCount = count;
  
      if (endIndex < count) {
        results.next = {
          page: page + 1,
          limit: limit,
        };
      }
  
      if (startIndex > 0) {
        results.previous = {
          page: page - 1,
          limit: limit,
        };
      }
  
      results.wars = await warModel.find().skip(startIndex).limit(limit).exec();
  
      res.json(results);
    } catch (error) {
      console.error(error);
      res.status(500).json({ message: "Server Error" });
    }
  });
  
module.exports = router;
