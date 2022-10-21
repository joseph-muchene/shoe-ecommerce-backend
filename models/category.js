const mongoose = require("mongoose");

const categorySchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: true,
      maxlength: 20,
      minlength: 3,
    },
  },
  { timestamps: true }
);

module.exports = mongoose.model("Category", categorySchema);
