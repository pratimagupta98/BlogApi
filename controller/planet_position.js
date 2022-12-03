const Planet = require("../models/planet_position.js");
const resp = require("../helpers/apiResponse");
 const cloudinary = require("cloudinary").v2;
 const fs = require("fs");

exports.add_planet_position = async (req, res) => {
  const {planet_name,point_range,doller_rupees,img} = req.body;

  const newPlanet = new Planet({
    planet_name:planet_name,
    point_range:point_range,
    doller_rupees:doller_rupees,
    img:img

  })
  if (req.file) {
    const resp = await cloudinary.uploader.upload(req.file.path);
    // if (resp) {
      newPlanet.img = resp.secure_url;
    fs.unlinkSync(req.file.path);
  }
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
 