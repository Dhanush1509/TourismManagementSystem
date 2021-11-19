const Razorpay = require("razorpay");
const asyncHandler = require("express-async-handler");
const Order = require("../models/Order.js");
const { nanoid } = require("nanoid");
const dotenv = require("dotenv");

dotenv.config();
const razorPayInstance = asyncHandler(async (req, res) => {
  const {
    infantsCount,
    adultsCount,
    permanentAddress,
    paymentOption,
    taxPrice,
    packagePrice,
    totalPrice,
    travellerDetails,
    packageInfo,
  } = req.body;
  const instance = new Razorpay({
    key_id: process.env.RAZORPAY_KEY_ID,
    key_secret: process.env.RAZORPAY_PASSWORD,
  });
  // console.log(req.user._id)

  const options = {
    amount: totalPrice * 100, // amount in smallest currency unit
    currency: "INR",
    receipt: nanoid(6),
  };
  const order = new Order({
    infantsCount,
    adultsCount,
    permanentAddress,
    paymentOption,
    taxPrice,
    packagePrice,
    totalPrice,
    user: req.user._id,
    travellerDetails,
    packageInfo,
  });
  const order1 = await order.save();
  
  await instance.orders.create(options, (err, order2) => {
    if (err) {
      console.log(err);
      res.status(500).json({ message: err.description });
    } else {
      res.status(201).json({ ...order2, ...order1 });
    }
  });
});
module.exports = razorPayInstance;
