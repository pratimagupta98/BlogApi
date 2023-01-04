const Planet = require("../models/planet_position.js");
const resp = require("../helpers/apiResponse");
 const cloudinary = require("cloudinary").v2;
 const fs = require("fs");
 const User = require("../models/user");


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

 exports.all_time_karma= async (req, res) => {
  const getplanet = await Planet.find()
  let Sun = getplanet[0]
let murcury = getplanet[1]
   const getuser = await User.find({status:"true"})
  .sort({meteors:-1}).limit(9)
  console.log("getuser",getuser)
  
   let index0 = getuser[0]
   let index1 = getuser[1]
   let index2 = getuser[2]
   let index3 = getuser[3]
   let index4 = getuser[4]
   let index5 = getuser[5]
   let index6 = getuser[6]
   let index7 = getuser[7]
   let index8 = getuser[8]


 //  console.log("index1",index1)
   let image0= "https://res.cloudinary.com/dc7hzwpbm/image/upload/v1670070489/vc8jqia4p03mcmsfsu4s.png"  //saturn
   let winner0 ="https://res.cloudinary.com/dc7hzwpbm/image/upload/v1672750483/u9khf64n03seqhbhflc0.png"
   let image1 = "https://res.cloudinary.com/dc7hzwpbm/image/upload/v1670070249/dasgxnu2tpymxavh2d65.png"  //sun
    let winner1 = "https://res.cloudinary.com/dc7hzwpbm/image/upload/v1672822945/utvv6gwfv4ymheurmmyl.png"
    let image2 = "https://res.cloudinary.com/dc7hzwpbm/image/upload/v1670070517/o31vm4pjsespbflctuyc.png"  // uranus
    let winner2 = "https://res.cloudinary.com/dc7hzwpbm/image/upload/v1672823272/uftxvlukaxqk7nnznhbw.png"
    let image3 = "https://res.cloudinary.com/dc7hzwpbm/image/upload/v1670070363/o5kcs94prjzuzx54h0o9.png" // venus
   let wineer3 = "https://res.cloudinary.com/dc7hzwpbm/image/upload/v1672823746/ey1tgcxpilhhull8yvah.png"
    let image4 = "https://res.cloudinary.com/dc7hzwpbm/image/upload/v1670070584/fmufwdrrfio0fp6rcypc.png"  //earth
   let wineer4 = "https://res.cloudinary.com/dc7hzwpbm/image/upload/v1672823788/ifox0b7v8sbtn8mr7bro.png"
    let image5 = "https://res.cloudinary.com/dc7hzwpbm/image/upload/v1670070454/ypbhsfzcpp9c2v7zt2wf.png" //Jupiter
let wineer5 ="https://res.cloudinary.com/dc7hzwpbm/image/upload/v1672823824/vemlpgfizofxr6ndv5vx.png"
let image6 = "https://res.cloudinary.com/dc7hzwpbm/image/upload/v1670070311/ofzoh9w2qsu8eozonet0.png"  // mercury
let wineer6 = "https://res.cloudinary.com/dc7hzwpbm/image/upload/v1672823863/qwpk9vuw8evdbumyv5lk.png"
let image7 = "https://res.cloudinary.com/dc7hzwpbm/image/upload/v1670070399/zqgnmvxositu1slptgcm.png"  // mars
let wineer7 ="https://res.cloudinary.com/dc7hzwpbm/image/upload/v1672823901/azinlej2el29pw8uxjgj.png"
let image8 = "https://res.cloudinary.com/dc7hzwpbm/image/upload/v1670070551/bp73dcy0nucyebx6jky5.png" // neptune
let wineer8 = "https://res.cloudinary.com/dc7hzwpbm/image/upload/v1672837692/yc4dpakf5nbvgzmrizu1.png"

 const getdata =   await User.findOneAndUpdate(
      {
        _id : getuser[0],
      },
      { $set:{ planetImg:image0,winnerImg:winner0} },
      { new: true }
    )
   console.log("user",getdata)

    const getdata1 =   await User.findOneAndUpdate(
      {
        _id :getuser[1],
      },
      { $set:{ planetImg:image1,winnerImg:winner1} },
      { new: true }
    )
    console.log("getdata1",getdata1)


    const getdata2 =   await User.findOneAndUpdate(
      {
        _id :getuser[2],
      },
      { $set:{ planetImg:image2,winnerImg:winner2} },
      { new: true }
    )
    console.log("getdata2",getdata2)

    const getdata3 =   await User.findOneAndUpdate(
      {
        _id :getuser[3],
      },
      { $set:{ planetImg:image3,winnerImg:wineer3} },
      { new: true }
    )
    console.log("getdata3",getdata3)

    const getdata4 =   await User.findOneAndUpdate(
      {
        _id :getuser[4],
      },
      { $set:{ planetImg:image4,winnerImg:wineer4} },
      { new: true }
    )
    console.log("getdata4",getdata4)

    const getdata5 =   await User.findOneAndUpdate(
      {
        _id :getuser[5],
      },
      { $set:{ planetImg:image5,winnerImg:wineer5} },
      { new: true }
    )
    console.log("getdata5",getdata5)
    const getdata6 =   await User.findOneAndUpdate(
      {
        _id :getuser[6],
      },
      { $set:{ planetImg:image6,winnerImg:wineer6} },
      { new: true }
    )
    console.log("getdata6",getdata6)


    const getdata7 =   await User.findOneAndUpdate(
      {
        _id :getuser[7],
      },
      { $set:{ planetImg:image7,winnerImg:wineer7} },
      { new: true }
    )
    console.log("getdata7",getdata7)

    const getdata8 =   await User.findOneAndUpdate(
      {
        _id :getuser[8],
      },
      { $set:{ planetImg:image8,winnerImg:wineer8} },
      { new: true }
    )
    console.log("getdata8",getdata8)

   res.status(200).json({
    status:true,
    msg :"success",
    data:[getdata,getdata1,getdata2,getdata3,getdata4,getdata5,getdata6,getdata7,getdata8]
  //  position1:[index0,index1]
      //`img0:${image0}`,`winner0:${winner0}`,index1,`img1:${image1}`,`winner1:${winner1}`]
      //`sun:${image}`,`winner:${winner1}`,`user2:${murcury}`],
   // sun:[image],
    // winner1:winner1,
    // position2:murcury,
    // murcury:image2,
    // image3 : image3



   
   })
 
 
 
};

exports.user_planet_position= async (req, res) => {
  await Planet.find()
    .sort({ sortorder: 1 })
    .then((data) => resp.successr(res, data))
    .catch((error) => resp.errorr(res, error));
};
 


exports.edit_planet_position = async (req, res) => {
  await Planet.findOneAndUpdate(
    {
      _id: req.params.id,
    },
    { $set: req.body },
    { new: true }
  )
    .then((data) => resp.successr(res, data))
    .catch((error) => resp.errorr(res, error));
};
