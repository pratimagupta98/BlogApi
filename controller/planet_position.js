const Planet = require("../models/planet_position.js");
const resp = require("../helpers/apiResponse");
// const cloudinary = require("cloudinary").v2;
// const fs = require("fs");

exports.add_planet_position = async (req, res) => {
  const {planet_name,points,doller_rupees} = req.body;

  const newPlanet = new Planet({
    planet_name:planet_name,
    points:points,
    doller_rupees:doller_rupees,

  })
  newPlanet
       .save()
       .then((data) => resp.successr(res, data))
       .catch((error) => resp.errorr(res, error));
  
 }

 exports.user_planet_position= async (req, res) => {
  await Planet.find()
    .sort({ sortorder: 1 })
    .then((data) => resp.successr(res, data))
    .catch((error) => resp.errorr(res, error));
};
 