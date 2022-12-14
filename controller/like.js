const like = require("../models/like");
const resp = require("../helpers/apiResponse");
// const cloudinary = require("cloudinary").v2;
// const fs = require("fs");

exports.add_like = async (req, res) => {
  const { submitresrcId, userid, status } = req.body;

  const newlike = new like({
    submitresrcId: submitresrcId,
    userid: userid,
    status: status,

  })
  const findexist = await like.findOne({
    $and: [{ submitresrcId: submitresrcId }, { userid: userid }]
  }
  )
  // if (findexist) {
  //   await like.findOneAndUpdate(
  //     {
  //       _id:findexist._id

  //     },
  //     {$set :{status:req.body.status}},
  //     {new:true}
  //   )
  //   .then((data) => resp.successr(res, data))
  //   .catch((error) => resp.errorr(res, error));
  // }
  // else {
    newlike
      .save()
      .then((data) => resp.successr(res, data))
      .catch((error) => resp.errorr(res, error));
  }
//}



exports.my_likes = async (req, res) => {
  await like.find({
    $and: [{ status: "true" }, { userid: req.params.id }],
  }).populate("userid").populate("submitresrcId").populate({
    path: "submitresrcId",
    populate: {
      path: "relYear",
    },
  })
    .populate({
      path: "submitresrcId",
      populate: {
        path: "category",
      },
    })
    .populate({
      path: "submitresrcId",
      populate: {
        path: "sub_category",
      },
    })


    .sort({ createdAt: -1 })
    .then((data) => resp.successr(res, data))
    .catch((error) => resp.errorr(res, error));
};

exports.getone_news_ltr = async (req, res) => {
  await NewsLLtr.findOne({ _id: req.params.id }).populate("category")
    .then((data) => resp.successr(res, data))
    .catch((error) => resp.errorr(res, error));
};


// exports.dislike = async (req, res) => {
//   await like.deleteOne({ _id: req.params.id })
//     .then((data) => resp.deleter(res, data))
//     .catch((error) => resp.errorr(res, error));
// };


exports.dlt_news_ltr = async (req, res) => {
  await SubCategory.deleteOne({ _id: req.params.id })
    .then((data) => resp.deleter(res, data))
    .catch((error) => resp.errorr(res, error));
};

exports.dis_book_mark = async (req, res) => {
  await like.findOneAndUpdate(
    {
      _id: req.params.id,
    },
    { $set: { status: req.body.status } },
    { new: true }
  )
    .then((data) => resp.successr(res, data))
    .catch((error) => resp.errorr(res, error));
};


// exports.dltmany = async (req, res) => {
//   await like.deleteMany()
//     .then((data) => resp.deleter(res, data))
//     .catch((error) => resp.errorr(res, error));
// };


// exports.getone_mylikes = async (req, res) => {
//   await like.findOne({
//       $and: [ { userid: req.params.userid },{submitresrcId: req.params.submitresrcId }, ],
//    } )
//   //  .populate("userid").populate("submitresrcId").populate({
//   //   path: "submitresrcId",
//   //   populate: {
//   //     path: "relYear",
//   //   },
//   // })
//   // .populate({
//   //   path: "submitresrcId",
//   //   populate: {
//   //     path: "category",
//   //   },
//   // })
//   // .populate({
//   //   path: "submitresrcId",
//   //   populate: {
//   //     path: "sub_category",
//   //   },
//   // })
//   // .populate({
//   //   path: "submitresrcId",
//   //   populate: {
//   //     path: "language",
//   //   },
//   // })

//     .sort({ createdAt: -1 })
//     .then((data) => resp.successr(res, data))
//     .catch((error) => resp.errorr(res, error));
// };

exports.getone_mylikes = async (req, res) => {
  await like.findOne({ $and: [{ userid: req.params.userid }, { submitresrcId: req.params.submitresrcId }] })
    // .populate({
    //   path: "submitresrcId",
    //   populate: {
    //     path: "language",
    //   },
    // })
    .then((data) => resp.successr(res, data))
    .catch((error) => resp.errorr(res, error));
};