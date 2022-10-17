const Year = require('../models/year');

exports.allYear = async (req, res) => {
    const findall = await Year.find(req.body)
    if (findall) {
        res.status(200).json({
            status: true,
            msg: "success",
            data: findall
        })
    } else {
        res.status(400).json({
            status: false,
            msg: "error",
            error: "error"
        })
    }
}