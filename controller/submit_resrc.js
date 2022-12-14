const Submit = require("../models/submit_resrc");
const User = require("../models/user");
const Category = require("../models/category");

const resp = require("../helpers/apiResponse");
const SubCategory = require("../models/subcategory");

const cloudinary = require("cloudinary").v2;
const fs = require("fs");
cloudinary.config({
  cloud_name: process.env.CLOUD_NAME,
  api_key: process.env.CLOUDINARY_API_KEY,
  api_secret: process.env.CLOUDINARY_API_SECRET,
});

//uploadFile
const { imageUpload } = require("../helpers/awsuploader");

const { uploadBase64ImageFile } = require("../helpers/awsuploader");
const { Console } = require("console");


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


exports.addSub_resrc = async (req, res) => {
  const { userid, link, category, sub_category, type, format, topics, desc, resTitle, creatorName, relYear, res_desc, comment, img, language } = req.body;

  const newSubmit = new Submit({
    userid: userid,
    link: link,
    category: category,
    sub_category: sub_category,
    type: type,
    format: format,
    language: language,
    topics: topics,
    desc: desc,
    resTitle: resTitle,
    creatorName: creatorName,
    relYear: relYear,
    res_desc: res_desc,
    comment: comment,
    img: img,
    usertype: "user"
  });
  if (req.file) {
    const resp = await cloudinary.uploader.upload(req.file.path);
    // if (resp) {
    newSubmit.img = resp.secure_url;
    fs.unlinkSync(req.file.path);
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



exports.App_Sub_resrc = async (req, res) => {
  const { userid, link, category, sub_category, type, format, topics, desc, resTitle, creatorName, relYear, res_desc, comment, language, img } = req.body;

  //  const coursedetail = await Submit.findOne({ topics:topics });
  // if (coursedetail) {
  //console.log(coursedetail.popularity)
  // let increment = coursedetail.trendingPoint + 1;
  //   await Submit.findOneAndUpdate(
  //     {
  //       userid: req.body.id,
  //     },
  //     { $set: { trendingPoint: increment } },
  //     { new: true }
  //   )
  // }


  const newSubmit = new Submit({
    userid: userid,
    link: link,
    category: category,
    sub_category: sub_category,
    type: type,
    format: format,
    topics: topics,
    desc: desc,
    resTitle: resTitle,
    creatorName: creatorName,
    relYear: relYear,
    res_desc: res_desc,
    comment: comment,
    language: language,
    img: img,
    usertype: "user",
    //  trendingPoint:increment
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

  //##############
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
      console.log(geturl, "&&&&");
      if (geturl) {
        newSubmit.img = geturl.Location;

        //fs.unlinkSync(`../uploads/${req.files.course_image[0]?.filename}`);
      }
    }

    //$$$$$$$$$$$
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



    // if (req.file) {
    //   const resp = await cloudinary.uploader.upload(req.file.path);
    //   // if (resp) {
    //     newSubmit.img = resp.secure_url;
    //   fs.unlinkSync(req.file.path);
    // }
    newSubmit
      .save()
      .then((data) => resp.successr(res, data))
      .catch((error) => resp.errorr(res, error));
  }
}

exports.admin_Sub_resrc = async (req, res) => {
  const { link, category, sub_category, type, format, language, topics, desc, resTitle, creatorName, relYear, res_desc, comment, img } = req.body;

  const newSubmit = new Submit({

    link: link,
    category: category,
    sub_category: sub_category,
    type: type,
    format: format,
    language: language,
    topics: topics,
    desc: desc,
    resTitle: resTitle,
    creatorName: creatorName,
    relYear: relYear,
    res_desc: res_desc,
    comment: comment,
    img: img,
    usertype: "admin"
  });
  if (req.file) {
    const resp = await cloudinary.uploader.upload(req.file.path);
    // if (resp) {
    newSubmit.img = resp.secure_url;
    fs.unlinkSync(req.file.path);
  }
  newSubmit
    .save()
    .then((data) => resp.successr(res, data))
    .catch((error) => resp.errorr(res, error));
}



exports.user_sub_res_lsit = async (req, res) => {
  await Submit.find({ usertype: "user" }).populate("category").populate("language")
    .sort({ createdAt: -1 })

    .populate("category").populate("sub_category").populate("relYear").populate("userid")
    .then((data) => resp.successr(res, data))
    .catch((error) => resp.errorr(res, error));
};



exports.active_resrc_lsit = async (req, res) => {
  await Submit.find({ $and: [{ usertype: "user" }, { aprv_status: "Active" }] }).populate("category").populate("language")
    .sort({ createdAt: -1 })

    .populate("category").populate("sub_category").populate("relYear").populate("userid")
    .then((data) => resp.successr(res, data))
    .catch((error) => resp.errorr(res, error));
};

exports.admin_sub_res_lsit = async (req, res) => {
  await Submit.find({ usertype: "admin" }).populate("category")
    .sort({ createdAt: -1 })

    .populate("category").populate("sub_category").populate("relYear").populate("userid").populate("language")
    .then((data) => resp.successr(res, data))
    .catch((error) => resp.errorr(res, error));
};

exports.Promotions = async (req, res) => {
  await Submit.find({ $and: [{ usertype: "admin" }, { status: "Active" }] }).populate("category")
    .sort({ createdAt: -1 })

    .populate("category").populate("sub_category").populate("relYear").populate("userid").populate("language")
    .then((data) => resp.successr(res, data))
    .catch((error) => resp.errorr(res, error));
};



exports.getone_reslist = async (req, res) => {
  await Submit.findOne({ _id: req.params.id }).populate("category").populate("sub_category").populate("relYear").populate("userid").populate("language")
    .then((data) => resp.successr(res, data))
    .catch((error) => resp.errorr(res, error));
};



exports.edit_submit_rsrc = async (req, res) => {
  const { link, category, sub_category, type, format, language, topics, desc, resTitle, creatorName, relYear, res_desc, comment } = req.body
  data = {};
  if (link) {
    data.link = link;
  }
  if (category) {
    data.category = category
  } if (sub_category) {
    data.sub_category = sub_category
  } if (type) {
    data.type = type
  } if (format) {
    data.format = format
  } if (language) {
    data.language = language
  } if (topics) {
    data.topics = topics
  } if (desc) {
    data.desc = desc
  } if (resTitle) {
    data.resTitle = resTitle
  } if (creatorName) {
    data.creatorName = creatorName
  } if (relYear) {
    data.relYear = relYear
  } if (res_desc) {
    data.res_desc = res_desc
  } if (comment) {
    data.comment = comment
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
    { $set: data },
    { new: true }
  )
    .then((data) => resp.successr(res, data))
    .catch((error) => resp.errorr(res, error));
};


exports.dlt_subres_list = async (req, res) => {
  await Submit.deleteOne({ _id: req.params.id })
    .then((data) => resp.deleter(res, data))
    .catch((error) => resp.errorr(res, error));
};





exports.listbycategory = async (req, res) => {
  const getone = await SubCategory.find({ category: req.params.id }).populate("category")
    .sort({ sortorder: 1 })
  console.log("getone", getone)

  if (getone) {
    //  var sublength = getone.length
    //  console.log("subcategoryLength",sublength)
    const finddata = await Category.findOneAndUpdate(
      {
        _id: req.params.id,
      },
      { $set: { subCount: getone.length } },
      { new: true }

    )
    console.log("finddata", finddata)
    res.status(200).json({
      status: true,
      message: "success",
      count: getone.length,
      data: getone,
    })
  } else {
    res.status(400).json({
      status: false,
      message: "error",
      error: error,
    })
  }
  // .then((data) => resp.successr(res, data))
  // .catch((error) => resp.errorr(res, error));
};

exports.listbysubcategory = async (req, res) => {
  const getone = await Submit.find({ $and: [{ sub_category: req.params.id }, { aprv_status: "Active" }] }).populate("category").populate("sub_category").populate("relYear")
    .sort({ sortorder: 1 }).populate("language")

  if (getone) {

    const finddata = await SubCategory.findOneAndUpdate(
      {
        _id: req.params.id,
      },
      { $set: { conent_count: getone.length } },
      { new: true }

    )
    console.log("finddata", finddata)
    res.status(200).json({
      status: true,
      message: "success",
      count: getone.length,
      data: getone,
    })
  } else {
    res.status(400).json({
      status: false,
      message: "error",
      error: error,
    })
  }


  // .then((data) => resp.successr(res, data))
  // .catch((error) => resp.errorr(res, error));
}



exports.total_sub_resrc = async (req, res) => {
  await Submit.countDocuments({ usertype: "user" }).populate("category")

    .then((data) => resp.successr(res, data))
    .catch((error) => resp.errorr(res, error));
};


exports.total_paid_resrc = async (req, res) => {
  await Submit.countDocuments({ $and: [{ usertype: "user" }, { type: "Paid" }] }).populate("category")

    .then((data) => resp.successr(res, data))
    .catch((error) => resp.errorr(res, error));
};

exports.total_free_resrc = async (req, res) => {
  await Submit.countDocuments({ $and: [{ usertype: "user" }, { type: "Free" }] }).populate("category")

    .then((data) => resp.successr(res, data))
    .catch((error) => resp.errorr(res, error));
};


//and: [{ status: "Active" }, { _id: req.params.id }]


exports.my_content_meteros = async (req, res) => {
  const getmeteros = await User.findOne({ _id: req.params.id })

  if (getmeteros) {
    res.status(200).json({
      status: true,
      msg: "success",
      meteors: getmeteros.meteors,
      rating_meteros: getmeteros.rating_meteros,
      review_meteros: getmeteros.review_meteros


    })
  } else {
    res.status(400).json({
      status: false,
      msg: "error",
      error: "error",
    });
  }
}

({ $and: [{ usertype: "user" }, { aprv_status: "Active" }] })

exports.filterbypaid_subresrc = async (req, res) => {
  const findall = await Submit.find({
    $and: [

      { $and: [{ "type": "Paid" }] }, { $or: [{ status: "Active" }, { aprv_status: "Active" }] }
    ]
  }).populate("category").populate("sub_category").populate("relYear").populate("language")
    .then((data) => resp.successr(res, data))
    .catch((error) => resp.errorr(res, error));
};


exports.filter_type = async (req, res) => {
  const findall = await Submit.find({
    $and: [

      { $and: [{ sub_category: req.params.sub_category }, { type: req.params.id }] }, { $and: [{ aprv_status: "Active" }] }
    ]
  }).populate("category").populate("sub_category").populate("relYear").populate("language")

    .then((data) => resp.successr(res, data))
    .catch((error) => resp.errorr(res, error));
};



exports.filterbyFormat = async (req, res) => {
  const findall = await Submit.find({
    $and: [

      { $and: [{ sub_category: req.params.sub_category }, { format: req.params.id }] }, { $and: [{ aprv_status: "Active" }] }
    ]
  }).populate("category").populate("sub_category").populate("relYear").populate("language")
    .then((data) => resp.successr(res, data))
    .catch((error) => resp.errorr(res, error));
};

// NO USE
exports.filterbytext = async (req, res) => {
  const findall = await Submit.find({
    $and: [

      { $and: [{ sub_category: req.params.sub_category }, { "format": "Text" }] }, { $and: [{ aprv_status: "Active" }] }
    ]
  }).populate("category").populate("sub_category").populate("relYear").populate("language")

    .then((data) => resp.successr(res, data))
    .catch((error) => resp.errorr(res, error));
};


exports.searchinputproduct = async (req, res) => {
  const { oneinput } = req.body;
  await Product.find({ product_name: { $regex: oneinput, $options: "i" } })
    .then((data) => {
      res.status(200).json({
        status: true,
        data: data,
      });
    })
    .catch((error) => {
      res.status(400).json({
        status: false,
        msg: "error",
        error: error,
      });
    });
};

exports.search_topic_title = async (req, res) => {
  const { searchinput } = req.body
  await Submit.find({
    $or: [{ resTitle: { $regex: searchinput, $options: "i" } },
    { topics: { $regex: searchinput, $options: "i" } }
    ]
  })
    .then((data) => {
      res.status(200).json({
        status: true,
        data: data,
      });
    })
    .catch((error) => {
      res.status(400).json({
        status: false,
        msg: "error",
        error: error,
      });
    });
}



exports.filterbyyear = async (req, res) => {


  const findall = await Submit.find({
    $and: [

      { $and: [{ sub_category: req.params.sub_category }, { relYear: req.params.id }] }, { $and: [{ aprv_status: "Active" }] }
    ]
  }).populate("category").populate("sub_category").populate("relYear").populate("language")
    .then((data) => resp.successr(res, data))
    .catch((error) => resp.errorr(res, error));
};


exports.filterbyLanguage = async (req, res) => {


  const findall = await Submit.find({
    $and: [

      { $and: [{ sub_category: req.params.sub_category }, { language: req.params.id }] }, { $and: [{ aprv_status: "Active" }] }
    ]
  }).populate("category").populate("sub_category").populate("relYear").populate("language")
    .then((data) => resp.successr(res, data))
    .catch((error) => resp.errorr(res, error));
};




exports.treding_topics = async (req, res) => {

  const getrating = await Submit.find({ status: "Active" })
  console.log("GETRATING", getrating)


  //   const getratingg = await Submit.find({status: "Active"}).distinct("topics") 
  //   console.log("GETRATING",getratingg)

  if (getrating) {
    var newarr1 = getrating.map(function (value) {
      // return value+= value;
      return value.topics
    });

    //    let uniq = [...new Set(getrating)]

    console.log("UNIQUE", newarr1)
  }
  //    const uniqueMembers = [...newarr1];
  //    console.log("sss",uniqueMembers);
  //    // let total = newarr1/

  //    console.log("New Array",newarr1)
  //   // let gettr = newarr1.#java
  //    console.log(newarr1.length); // undefined
  //     var ttlr = newarr1.length
  //     console.log("tt",ttlr)
  //   }


  // let  a = [newarr1]
  // let b = uniqBy(a, JSON.stringify)
  //   console.log("B",b) 


  const getratingg = await Submit.find({ status: "Active" }).distinct("topics")
  console.log("GETRATING", getratingg)

  if (getratingg) {
    var newarr1 = getratingg.map(function (value) {
      // return value+= value;
      return value.topics
    });
  }

  let uniq = [...new Set(getratingg)]

  console.log("UNIQUE", uniq)


}

exports.filterbyHashTag = async (req, res) => {


  await Submit.find({
    $and: [{ topics: req.params.id }, { $and: [{ aprv_status: "Active" }] }
    ]
  }
  ).populate("category").populate("sub_category").populate("relYear").populate("language")
    .then((data) => resp.successr(res, data))
    .catch((error) => resp.errorr(res, error));
};

// exports.approve_submit_resrc = async (req, res) => {


//   const upateone =  await Submit.findOneAndUpdate(
//       {
//         _id: req.params.id,
//       },
//       { $set: {aprv_status:req.body.aprv_status,status:req.body.status} },
//       { new: true }
//     )

//     if(upateone.aprv_status == "Active"){
//     //   const getpoint = upateone.meteors
//     //   console.log("getpoint",getpoint)

//     //  const totalmetors = parseInt(getpoint)+ parseInt(10)
//     const getdata = await Submit.findOne({_id :req.params.id}).populate("userid")
//     console.log("STRING",getdata)
//     const getuser = (getdata.userid)
//     console.log("getuser",getuser)
//     const findmeteros =getuser.meteors 
//     console.log("METEROS",findmeteros)

//     const smetors =getdata.meteors
//     console.log("submit Metores",smetors)

//     var total =parseInt (findmeteros) + parseInt(10)

//     const updateuser =  await User.findOneAndUpdate(
//       {
//         _id:getuser ,
//       },
//       { $set: {meteors:total} },
//       { new: true }

//     )

//    // const getdatail = await Submit.findOne({_id :req.params.id}).populate("userid")



//     var date = new Date();
// var firstDay = new Date(date.getFullYear(), date.getMonth(), 2);
// var lastDay = new Date(date.getFullYear(), date.getMonth() + 1, 0);
// console.log("FIRST",firstDay)
// console.log("lAST",lastDay)
// const getdatail = await Submit.findOne({ $and: [
//   {_id :req.params.id },
//   {
//     createdAt: {
//       $gte: new Date(firstDay),
//       $lte: new Date(lastDay)
//     }
//   }
// ]
// }).populate("userid")

// console.log("GETDATA",getdatail)


// const getUsers = getdatail.userid
// console.log("USER",getUsers)
// const getmetors = getdatail.meteors
// console.log("GET METORES",getmetors)
// var sttl = parseInt (getmetors) + parseInt(10)


//     const updatecontent =  await Submit.findOneAndUpdate(
//       {
//         userid:getUsers ,
//       },
//       { $set: {meteors:sttl} },
//       { new: true }

//     )

//     console.log("AAAA",updatecontent)
//  // const getmet  = updateuser.meteors
//   console.log("SSSS",updateuser)
//     res.status(200).json({
//       status: true,
//       status: "success",
//       data: upateone,
//       meteors:updateuser.meteors,
//       metorss:updatecontent.meteors,
//       dataSS: updatecontent,
//     });
//     }
//     // if (upateone) {
//     //   res.status(200).json({
//     //     status: true,
//     //     msg: "success",
//     //     data: upateone,
//     //   });
//      else {
//       res.status(200).json({
//         status: true,
//         status: "success",
//         data: upateone,
//         datas:updatecontent
//       });
//     }
//     // .then((data) => resp.successr(res, data))
//     // .catch((error) => resp.errorr(res, error))
//   };

exports.approve_submit_resrc = async (req, res) => {
  const upateone = await Submit.findOneAndUpdate(
    {
      _id: req.params.id,
    },
    { $set: { aprv_status: req.body.aprv_status, status: req.body.status } },
    { new: true }
  ).populate("userid")
  const getsubmitmtrs = upateone.meteors
  console.log("SUBMIT METORES", getsubmitmtrs)
  const uderdet = upateone.userid
  console.log("USER", uderdet)
  const getonemetrs = uderdet.meteors
  console.log("GET ONE METROES", getonemetrs)

  if (upateone.aprv_status == "Active") {
    var date = new Date();
    var firstDay = new Date(date.getFullYear(), date.getMonth(), 2);
    var lastDay = new Date(date.getFullYear(), date.getMonth() + 1, 0);
    console.log("FIRST", firstDay)
    console.log("lAST", lastDay)
    const findexist = await Submit.findOne({
      $and: [
        { userid: uderdet },
        {
          createdAt: {
            $gte: new Date(firstDay),
            $lte: new Date(lastDay)
          }
        }
      ]
    })
    if (findexist) {
      const existuser = findexist.userid
      console.log("USER", existuser)
      const existmetores = findexist.meteors
      console.log("GETMETORES", existmetores)
      const sttl = parseInt(existmetores) + parseInt(10)
      //  console.log("GET METORES",sttl)
      console.log("STTL", sttl)

      const updatecontent = await Submit.findOneAndUpdate(
        {
          userid: existuser,
        },
        { $set: { meteors: sttl } },
        { new: true }

      )

      var total = parseInt(getonemetrs) + parseInt(10)
      console.log("TOTAL", total)

      const updateuser = await User.findOneAndUpdate(
        {
          _id: existuser,
        },
        { $set: { meteors: total } },
        { new: true }

      )
      console.log("UPDATEW", updatecontent)
      console.log("UPDATTTTTTTTTEEEEE", updateuser)
      res.status(200).json({
        status: true,
        status: "success",
        data: updatecontent,
        // meteors:updatecontent.meteors,
        update: updateuser.meteors,
        // updatemetores:updateuser.meteors

      });




    }
    else {
      console.log("ELSE")

      var total = parseInt(getsubmitmtrs) + parseInt(10)

      const updateuser = await Submit.findOneAndUpdate(
        {
          _id: req.params.id,
        },
        { $set: { meteors: total } },
        { new: true }

      )

      //  var total =parseInt (findmetors) + parseInt(10)
      const usermtrs = getonemetrs + parseInt(10)
      const updatmetores = await User.findOneAndUpdate(
        {
          _id: uderdet,
        },
        { $set: { meteors: usermtrs } },
        { new: true }

      )
      console.log("UPpppp", updateuser)
      console.log("UDDDD USER", updatmetores)
      res.status(200).json({
        status: true,
        status: "success",
        data: updateuser,
        meteors: updatmetores.meteors,


      });
    }
  }

}


exports.posted_by_me= async (req, res) => {
//   await Submit.find({$and :[{userid:req.params.id},{aprv_status:"Active"}]})
//  .sort({meteors:-1}).limit(6).populate("userid")
 // .sort({ createdAt: -1 }).limit(6)

 await Submit.find({$and: [

  { $and: [{ userid:req.params.id }, { aprv_status:"Active" }] }, { $and: [{ format: "Video" }] }
]
}).populate("userid")
  
 .then((data) => resp.successr(res, data))
 .catch((error) => resp.errorr(res, error));
  
}