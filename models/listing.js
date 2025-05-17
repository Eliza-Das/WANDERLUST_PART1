const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const listingSchema = new Schema({
    title: {
        type: String,
        required: true,
    },
    description: String,
    image: {
        filename: String,
        url: {
            type: String,
            default: "https://www.istockphoto.com/photo/coastal-scenes-winter-sunset-gm115087239-1030771",
            set: (v) => v === "" ? "https://www.istockphoto.com/photo/coastal-scenes-winter-sunset-gm115087239-1030771" : v,
        },
    },
    price: Number,
    location: String,
    country: String,
});

const Listing = mongoose.model("Listing", listingSchema);
module.exports = Listing;
