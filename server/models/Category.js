const mongoose = require("mongoose");

const categorySchema = new mongoose.Schema({
    name: {
        type: String,
        required: "*required."
    },
    image: {
        type: String,
        required: "*required."
    }
});

module.exports = mongoose.model("Category", categorySchema);