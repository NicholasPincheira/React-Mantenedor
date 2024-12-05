const mongoose = require("mongoose");

const SliderSchema = new mongoose.Schema({
    title: { type: String, required: true },
    imageUrl: { type: String, required: true },
    customCss: { type: String },
    isFeatured: { type: Boolean, default: false }, // Campo destacado
  });

module.exports = mongoose.model("Slider", SliderSchema);
