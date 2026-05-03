const mongoose = require("mongoose");

const productSchema = new mongoose.Schema({
  name: {
    type: String,
    required: [true, "Please Enter your product name"],
  },
  description: {
    type: String,
    required: [true, "Please Enter your product description"],
  },
  category: {
    type: String,
    required: [true, "Please Enter your product category"],
  },
  tags: {
    type: String,
  },
  originalPrice: {
    type: Number,
  },
  discountPrice: {
    type: Number,
    required: [true, "Please Enter your product price"],
  },
  stock: {
    type: Number,
    required: [true, "Please Enter your product stock"],
  },
  reviews: [
    {
      user: {
        type: Object,
      },
      rating: {
        type: Number,
        default: 0,
      },

      comment: {
        type: String,
      },

      productId: {
        type: String,
      },
    },
  ],

  ratings: {
    type: Number,
    default: 0,
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

module.exports = mongoose.model("Product", productSchema);
