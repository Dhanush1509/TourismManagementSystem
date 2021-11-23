const asyncHandler = require("express-async-handler");
const Order = require("../models/Order.js");
const User = require("../models/User.js");
const Package = require("../models/Package.js");
const crypto = require("crypto");
const sgMail = require("@sendgrid/mail");
const dotenv = require("dotenv");
const { v4: uuidv4 } = require("uuid");
uuidv4();
dotenv.config();
exports.addOrder = asyncHandler(async (req, res) => {
  const {
    orderItems,
    delivery_Address,
    payment_Option,
    items_Price,
    delivery_Price,
    tax_Price,
    total_Price,
  } = req.body;

  const order = new Order({
    user: req.user._id,
    orderedItemsData: orderItems,
    deliveryAddress: delivery_Address,
    paymentOption: payment_Option,
    itemsPrice: items_Price,
    deliveryPrice: delivery_Price,
    taxPrice: tax_Price,
    totalPrice: total_Price,
  });
  const currentOrderItem = await order.save();
  // const orderDbId = currentOrderItem._id;
  // if(currentOrderItem)
  res.json(currentOrderItem);
});
exports.getOrderById = asyncHandler(async (req, res) => {
  const { id } = req.params;
  const order = await Order.findById(id)
    .populate("user", "name email")
    .populate("packageInfo");
  if (order) res.json(order);
  else res.json({ message: "order does not exists" });
});
exports.orderSuccess = asyncHandler(async (req, res) => {
  // getting the details back from our font-end
  const {
    orderCreationId,
    razorpayPaymentId,
    razorpayOrderId,
    razorpaySignature,
    orderIdOfCurrent,
  } = req.body;

  const shasum = crypto.createHmac("sha256", process.env.RAZORPAY_PASSWORD);
  shasum.update(`${orderCreationId}|${razorpayPaymentId}`);
  const digest = shasum.digest("hex");

  if (digest !== razorpaySignature) {
    return res.status(400).json({ msg: "Transaction not legit!" });
  }
  const order = await Order.findById(orderIdOfCurrent)
    .populate("user", "name email")
    .populate("packageInfo");

  if (order) {
    order.isPaid = true;
    order.paidAt = Date.now();

    order.paymentResult = {
      razorpayPaymentId,
      razorpayOrderId,
      razorpaySignature,
    };

    // const packageD=await Package.findById(order.packageInfo);
    // if(packageD)
    //   if(packageD.pAvailable>0)
    //   packageD.pAvailable=packageD.pAvailable-order.adultsCount;

    //   await PackageD.save();

    const updatedOrder = await order.save();
    if (updatedOrder) {
      sgMail.setApiKey(process.env.SENDGRID_API_KEY);
      const msg = {
        to: order.user.email,
        from: "ui19co56@iiitsurat.ac.in", // Use the email address or domain you verified above
        subject: "I ❤ HappyTour",
        text: "Ticket Reserved",
        html: `<br/><p>Click the below link to view the ticket</p><br/><a href="${process.env.URL}/tickets/${order._id}/ticket/download">View your ticket here.</a>`,
      };

      sgMail.send(msg).then(
        () => {},
        (error) => {
          console.error(error);

          if (error.response) {
            console.error(error.response.body);
          }
        }
      );
    }
    res.json({
      ...updatedOrder,
      message: "Ticket Reserved Successfully",
      success: true,
    });
  } else {
    throw new Error("Payment request failed");
  }
});
exports.getMyOrders = asyncHandler(async (req, res) => {
  const myorders = await Order.find({ user: req.user._id })
    .select("-paymentResult.razorpaySignature -paymentResult.razorpayOrderId")
    .populate("packageInfo");
  if (myorders) {
    res.status(200).json(myorders);
  } else {
    throw new Error("Orders not found");
  }
});
// }
// THE PAYMENT IS LEGIT & VERIFIED
// YOU CAN SAVE THE DETAILS IN YOUR DATABASE IF YOU WANT

exports.getAllOrders = asyncHandler(async (req, res) => {
  const orders = await Order.find({})
    .sort([["isPaid", -1]])
    .populate("packageInfo")
    .populate("user");
  if (orders) {
    res.status(200).json({ orders });
  } else {
    throw new Error("Orders not found");
  }
});
exports.updateOrderById = asyncHandler(async (req, res) => {
  const id = req.params.id;
  const order = await Order.findById(id);

  if (order) {
    order.isVerified = true;
    order.verifiedAt = Date.now();
    order.ID = uuidv4();
    const updatedOrder = await order.save();
    res.status(200).json(updatedOrder);
  } else {
    throw new Error("Some error occurred");
  }
});
