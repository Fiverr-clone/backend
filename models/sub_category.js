const mongoose = require("mongoose");

const sub_categorySchema = mongoose.Schema({
  name: { type: String, required: true },
  category: { type: mongoose.Schema.Types.ObjectId, ref: "Category", required: true }
});

module.exports = mongoose.model("SubCategory", sub_categorySchema);
