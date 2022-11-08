const HowWorks = require("../models/how_it_works");
const resp = require("../helpers/apiResponse");

exports.how_it_works = async (req, res) => {
  const { desc} = req.body;

  const newHowWorks = new HowWorks({
    
    desc:desc,
   });
    
   newHowWorks
      .save()
      .then((data) => resp.successr(res, data))
      .catch((error) => resp.errorr(res, error));
  }
 


exports.get_howWorks = async (req, res) => {
    await HowWorks.find()
      .sort({ sortorder: 1 })
      .then((data) => resp.successr(res, data))
      .catch((error) => resp.errorr(res, error));
  };

  exports.getone_howWorks = async (req, res) => {
    await HowWorks.findOne({ _id: req.params.id })
      .then((data) => resp.successr(res, data))
      .catch((error) => resp.errorr(res, error));
  };
  

  exports.edit_howWorks = async (req, res) => {
    await HowWorks.findOneAndUpdate(
      {
        _id: req.params.id,
      },
      { $set: req.body },
      { new: true }
    )
      .then((data) => resp.successr(res, data))
      .catch((error) => resp.errorr(res, error));
  };
  

  exports.dlt_howWorks = async (req, res) => {
    await HowWorks.deleteOne({ _id: req.params.id })
      .then((data) => resp.deleter(res, data))
      .catch((error) => resp.errorr(res, error));
  };
  