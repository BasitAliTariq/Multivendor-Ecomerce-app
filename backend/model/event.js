const mongoose = require("mongoose");

const eventSchema = new mongoose.Schema({
  name: {
    type: String,
    required: [true, "Please Enter your event product name"],
  },
  description: {
    type: String,
    required: [true, "Please Enter your event product description"],
  },
  category: {
    type: String,
    required: [true, "Please Enter your event product category"],
  },
  Start_Date: {
    type: Date,
    required: true,
  },
  Finished_Date: {
    type: Date,
    required: true,
  },

  status: {
    type: String,
    default: "Running",
  },

  tags: {
    type: String,
  },
  originalPrice: {
    type: Number,
  },
  discountPrice: {
    type: Number,
    required: [true, "Please Enter your event product price"],
  },
  stock: {
    type: Number,
    required: [true, "Please Enter your event product stock"],
  },
  images: [
    {
      type: String,
    },
  ],
  shopId: {
    type: String,
    required: true,
  },
  shop: {
    type: Object,
    required: true,
  },
  sold_out: {
    type: Number,
    default: 0,
  },
  createdAt: {
    type: Date,
    default: Date.now(),
  },
});

module.exports = mongoose.model("Event", eventSchema);
