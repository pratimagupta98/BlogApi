const { Double } = require("mongodb");
const mongoose = require("mongoose");
const Schema = mongoose.Schema;
const thisSchema = new Schema(
    {

        Comets_count: {
            type: Number,
        },
        avrage_rating: {
            type: Number,
        },
        views: {
            type: Double,
        },
        Sub_scriber: {
            type: Double,
        },
        Likes: {
            type: Double,
        },
        Dislikes: {
            type: Double,
        },
        BS_rating: {
            type: Double,
        }

    },

    { timestamps: true }
);


module.exports = mongoose.model("war", thisSchema);
