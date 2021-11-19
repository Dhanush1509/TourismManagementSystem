const mongoose = require("mongoose");

const orderSchema = mongoose.Schema(
  {
    user: {
      type: mongoose.Schema.Types.ObjectId,
      required: true,
      ref: "User",
    },
    packageInfo: {
      type: mongoose.Schema.Types.ObjectId,
      required: true,
      ref: "Package",
    },

    isVerified: { type: Boolean, default: false },
    travellerDetails: [
      {
        name: { type: String },
        age: { type: String },
        idNo: { type: String },
      },
    ],
    adultsCount: { type: Number },
    infantsCount: { type: Number },
    permanentAddress: {
      address: { type: String, required: true },
      city: { type: String, required: true },
      postalCode: { type: String, required: true },
      country: { type: String, required: true },
    },

    paymentOption: {
      type: String,
      required: true,
    },
    paymentResult: {
      razorpayPaymentId: { type: String },
      razorpayOrderId: { type: String },
      razorpaySignature: { type: String },
    },

    packagePrice: {
      type: Number,
      required: true,
      default: 0,
    },
    taxPrice: {
      type: Number,
      required: true,
      default: 0,
    },

    totalPrice: {
      type: Number,
      required: true,
      default: 0,
    },
    isPaid: {
      type: Boolean,
      required: true,
      default: false,
    },
    paidAt: {
      type: Date,
    },
    verifiedAt: { type: Date },
    ID: { type: String },
    options: {
      amount: { type: Number, default: 0 },
      currency: { type: String, default: "INR" },
      receipt: { type: String, default: "receipt_order_74394" },
    },
  },
  { timestamps: true }
);
Order = mongoose.model("Order", orderSchema);
module.exports = Order;
