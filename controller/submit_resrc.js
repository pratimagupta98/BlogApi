const Submit = require("../models/submit_resrc");
const User = require("../models/user");

const resp = require("../helpers/apiResponse");
const SubCategory = require("../models/subcategory");

 const cloudinary = require("cloudinary").v2;
 const fs = require("fs");

 const { uploadBase64ImageFile } = require("../helpers/awsuploader");
 var signatures = {
   JVBERi0: "application.pdf",
   R0lGODdh: "image.gif",
   R0lGODlh: "image.gif",
   iVBORw0KGgo: "image.png",
   "/9j/": "image.jpg"
 };
 
 function detectMimeType(b64) {
   for (var s in signatures) {
     if (b64.indexOf(s) === 0) {
       return signatures[s];
     }
   }
 }
 

exports.addSub_resrc= async (req, res) => {
  const { userid,link,category,sub_category,type,format,language,topics,desc,resTitle,creatorName,relYear,res_desc,comment,img} = req.body;

  const newSubmit= new Submit({
    userid:userid,
    link:link,
    category:category,
    sub_category:sub_category,
    type:type,
    format:format,
    language:language,
    topics:topics,
    desc:desc,
    resTitle:resTitle,
    creatorName:creatorName,
    relYear:relYear,
    res_desc:res_desc,
    comment:comment,
    usertype:"user"
   });
    if (req.files) {
      if (req.files.img) {
        alluploads = [];
        for (let i = 0; i < req.files.img.length; i++) {
          const resp = await cloudinary.uploader.upload(
            req.files.img[i].path,
            { use_filename: true, unique_filename: false }
          );
          fs.unlinkSync(req.files.img[i].path);
          alluploads.push(resp.secure_url);
        }
        newSubmit.img = alluploads;
      }
    }


    // if (img) {
    //   if (img) {
        

    //     const base64Data = new Buffer.from(img.replace(/^data:image\/\w+;base64,/, ""), 'base64');
    //     detectMimeType(base64Data);
    //     const type = detectMimeType(img);
    //     // console.log(newCourse,"@@@@@");
    //     const geturl = await uploadBase64ImageFile(
    //       base64Data,
    //       newSubmit.id,
    //      type
    //     );
    //     console.log(geturl,"&&&&");
    //     if (geturl) {
    //       newSubmit.img = geturl.Location;
         
    //       //fs.unlinkSync(`../uploads/${req.files.img[0]?.filename}`);
    //     }
    //   }




    newSubmit
       .save()
       .then((data) => resp.successr(res, data))
       .catch((error) => resp.errorr(res, error));
   }
  




  exports.App_Sub_resrc= async (req, res) => {
    const { userid,link,category,sub_category,type,format,language,topics,desc,resTitle,creatorName,relYear,res_desc,comment,img} = req.body;
  
    const newSubmit= new Submit({
      userid:userid,
      link:link,
      category:category,
      sub_category:sub_category,
      type:type,
      format:format,
      language:language,
      topics:topics,
      desc:desc,
      resTitle:resTitle,
      creatorName:creatorName,
      relYear:relYear,
      res_desc:res_desc,
      comment:comment,
      usertype:"user"
     });
      // if (req.files) {
      //   if (req.files.img) {
      //     alluploads = [];
      //     for (let i = 0; i < req.files.img.length; i++) {
      //       const resp = await cloudinary.uploader.upload(
      //         req.files.img[i].path,
      //         { use_filename: true, unique_filename: false }
      //       );
      //       fs.unlinkSync(req.files.img[i].path);
      //       alluploads.push(resp.secure_url);
      //     }
      //     newSubmit.img = alluploads;
      //   }
      // }
  
  
      if (img) {
        if (img) {
          
  
          const base64Data = new Buffer.from(img.replace(/^data:image\/\w+;base64,/, ""), 'base64');
          detectMimeType(base64Data);
          const type = detectMimeType(img);
          // console.log(newCourse,"@@@@@");
          const geturl = await uploadBase64ImageFile(
            base64Data,
            newSubmit.id,
           type
          );
          console.log(geturl,"&&&&");
          if (geturl) {
            newSubmit.img = geturl.Location;
           
            //fs.unlinkSync(`../uploads/${req.files.img[0]?.filename}`);
          }
        }
  
  
  
  
      newSubmit
         .save()
         .then((data) => resp.successr(res, data))
         .catch((error) => resp.errorr(res, error));
     }
    }
   




 

   exports.admin_Sub_resrc= async (req, res) => {
    const { link,category,sub_category,type,format,language,topics,desc,resTitle,creatorName,relYear,res_desc,comment} = req.body;
  
    const newSubmit= new Submit({
        
      link:link,
      category:category,
      sub_category:sub_category,
      type:type,
      format:format,
      language:language,
      topics:topics,
      desc:desc,
      resTitle:resTitle,
      creatorName:creatorName,
      relYear:relYear,
      res_desc:res_desc,
      comment:comment,
      usertype:"admin"
     });
      if (req.files) {
        if (req.files.img) {
          alluploads = [];
          for (let i = 0; i < req.files.img.length; i++) {
            const resp = await cloudinary.uploader.upload(
              req.files.img[i].path,
              { use_filename: true, unique_filename: false }
            );
            fs.unlinkSync(req.files.img[i].path);
            alluploads.push(resp.secure_url);
          }
          newSubmit.img = alluploads;
        }
      }
      newSubmit
         .save()
         .then((data) => resp.successr(res, data))
         .catch((error) => resp.errorr(res, error));
     }

     

exports.user_sub_res_lsit = async (req, res) => {
    await Submit.find({ usertype: "user" }).populate("category")
      .sort({ createdAt: -1 })
     
      .populate("category").populate("sub_category").populate("language").populate("relYear").populate("userid")
      .then((data) => resp.successr(res, data))
      .catch((error) => resp.errorr(res, error));
  };



  exports.active_resrc_lsit = async (req, res) => {
    await Submit.find({$and: [{ usertype: "user" }, { aprv_status: "Active" }]}).populate("category")
      .sort({ createdAt: -1 })
     
      .populate("category").populate("sub_category").populate("language").populate("relYear").populate("userid")
      .then((data) => resp.successr(res, data))
      .catch((error) => resp.errorr(res, error));
  };

  exports.admin_sub_res_lsit = async (req, res) => {
    await Submit.find({usertype:"admin"}).populate("category")
      .sort({ createdAt: -1 })
     
      .populate("category").populate("sub_category").populate("language").populate("relYear").populate("userid")
      .then((data) => resp.successr(res, data))
      .catch((error) => resp.errorr(res, error));
  };

  exports.Promotions = async (req, res) => {
    await Submit.find({$and: [{ usertype: "admin" }, { status: "Active" }]}).populate("category")
      .sort({ createdAt: -1 })
     
      .populate("category").populate("sub_category").populate("language").populate("relYear").populate("userid")
      .then((data) => resp.successr(res, data))
      .catch((error) => resp.errorr(res, error));
  };



  exports.getone_reslist = async (req, res) => {
    await Submit.findOne({ _id: req.params.id }).populate("category").populate("sub_category").populate("language").populate("relYear").populate("userid")
      .then((data) => resp.successr(res, data))
      .catch((error) => resp.errorr(res, error));
  };
  


  exports.edit_submit_rsrc = async (req, res) => {
    const {link,category,sub_category,type,format,language,topics,desc,resTitle,creatorName,relYear,res_desc,comment} = req.body
    data = {};
    if(link){
      data.link = link;
    }
    if (category) {
      data.category = category
    }if(sub_category){
data.sub_category =sub_category
    }if(type){
      data.type = type
    }if(format){
      data.format =format
    }if(language){
      data.language = language
    }if(topics){
      data.topics=topics
    }if(desc){
      data.desc =desc
    }if(resTitle){
      data.resTitle =resTitle
    }if(creatorName){
      data.creatorName =creatorName
    }if(relYear){
      data.relYear =relYear
    }if(res_desc){
      data.res_desc =res_desc
    }if(comment){
      data.comment =comment
    }
   
    if (req.files) {
      if (req.files.img) {
        alluploads = [];
        for (let i = 0; i < req.files.img.length; i++) {
          // console.log(i);
          const resp = await cloudinary.uploader.upload(req.files.img[i].path, {
            use_filename: true,
            unique_filename: false,
          });
          fs.unlinkSync(req.files.img[i].path);
          alluploads.push(resp.secure_url);
        }
        // newStore.storeImg = alluploads;
        data.img = alluploads;
      }
   }

    await Submit.findOneAndUpdate(
      {
        _id: req.params.id,
      },
      { $set: data},
      { new: true }
    )
      .then((data) => resp.successr(res, data))
      .catch((error) => resp.errorr(res, error));
  };
  

  exports.dlt_subres_list= async (req, res) => {
    await Submit.deleteOne({ _id: req.params.id })
      .then((data) => resp.deleter(res, data))
      .catch((error) => resp.errorr(res, error));
  };

  exports.approve_submit_resrc = async (req, res) => {

    
  const upateone =  await Submit.findOneAndUpdate(
      {
        _id: req.params.id,
      },
      { $set: {aprv_status:req.body.aprv_status,status:req.body.status} },
      { new: true }
    )
    
    if(upateone.aprv_status == "Active"){
    //   const getpoint = upateone.meteors
    //   console.log("getpoint",getpoint)

    //  const totalmetors = parseInt(getpoint)+ parseInt(10)
    const getdata = await Submit.findOne({_id :req.params.id}).populate("userid")
    console.log("STRING",getdata)
    const getuser = (getdata.userid)
    console.log("getuser",getuser)
    const findmeteros =getuser.meteors 
    console.log("METEROS",findmeteros)

    var total =parseInt (findmeteros) + parseInt(10)

    const updateuser =  await User.findOneAndUpdate(
      {
        _id:getuser ,
      },
      { $set: {meteors:total} },
      { new: true }

    )

    
 // const getmet  = updateuser.meteors
  console.log("SSSS",updateuser)
    res.status(200).json({
      status: true,
      status: "success",
      data: upateone,
      meteors:updateuser.meteors
    });
    }
    // if (upateone) {
    //   res.status(200).json({
    //     status: true,
    //     msg: "success",
    //     data: upateone,
    //   });
     else {
      res.status(200).json({
        status: true,
        status: "success",
        data: upateone,
      });
    }
    // .then((data) => resp.successr(res, data))
    // .catch((error) => resp.errorr(res, error))
  };



  exports.listbycategory = async (req, res) => {
    await SubCategory.find({ category: req.params.id }).populate("category") 
        .sort({ sortorder: 1 })
         
        .then((data) => resp.successr(res, data))
        .catch((error) => resp.errorr(res, error));
    };
  
    exports.listbysubcategory = async (req, res) => {
  const findall = await Submit.find({ sub_category: req.params.id }).populate("category").populate("sub_category").populate("relYear").populate("language")
    .sort({ sortorder: 1 })
     
    
    .then((data) => resp.successr(res, data))
    .catch((error) => resp.errorr(res, error));
}



exports.total_sub_resrc = async (req, res) => {
  await Submit.countDocuments({ usertype: "user" }).populate("category")
    
    .then((data) => resp.successr(res, data))
    .catch((error) => resp.errorr(res, error));
};


exports.total_paid_resrc = async (req, res) => {
  await Submit.countDocuments({ $and:[{usertype: "user" },{type:"Paid"}]}).populate("category")
    
    .then((data) => resp.successr(res, data))
    .catch((error) => resp.errorr(res, error));
};

exports.total_free_resrc = async (req, res) => {
  await Submit.countDocuments({ $and:[{usertype: "user" },{type:"Free"}]}).populate("category")
    
    .then((data) => resp.successr(res, data))
    .catch((error) => resp.errorr(res, error));
};


//and: [{ status: "Active" }, { _id: req.params.id }]


exports.my_content_meteros =  async (req, res) => {
  const getmeteros=  await User.findOne({_id:req.params.id} )

  if(getmeteros){
    res.status(200).json({
      status :true,
      msg :"success",
      meteors :getmeteros.meteors,
      
    })
  }else{
    res.status(400).json({
      status: false,
      msg: "error",
      error: "error",
    });
  }
  }
