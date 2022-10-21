const Schema = require("mongoose").Schema;
const mongoose = require("mongoose");
const orderSchema = new Schema({
  userId: {
    type: String,
    required: true,
  },
  email: {
    type: String,
    required: true,
  },

  ReceiptNumber: {
    type: String,
  },
  products: [
    {
      productId: {
        type: String,
      },
      quantity: {
        type: Number,
        default: 1,
      },
    },
  ],
  address: { type: Number },
  status: {
    type: String,
  },
  amount: { type: Number, required: true },
});

module.exports = mongoose.model("order", orderSchema);
