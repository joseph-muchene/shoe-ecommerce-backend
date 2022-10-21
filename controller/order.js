const Order = require("../models/order");

const createOrder = async (req, res) => {
  try {
    const newOrder = new Order(req.body);
    await newOrder.save();
    res.status(200).json(newOrder);
  } catch (err) {
    res.status(500).json(err);
  }
};

const updateOrder = async (req, res) => {
  try {
    Order.findByIdAndUpdate(
      { _id: req.params.id },
      { status: req.body.status },
      { new: true },
      (err, order) => {
        if (err || !order) {
          res.status(400).json("order does not exist");
        } else {
          res.status(200).json(order);
        }
      }
    );
  } catch (err) {
    res.status(500).json(err);
  }
};

const deleteOrder = async (req, res) => {
  try {
    //   get order
    const orderId = req.params.id;
    const removedOrder = await Order.findByIdAndRemove(orderId);
    res.status(200).json(removedOrder);
  } catch (err) {
    res.status(500).json(err);
  }
};

const userOrders = async (req, res) => {
  try {
    const userOrders = await Order.find({ userId: req.params.userId });
    res.status(200).json(userOrders);
  } catch (err) {
    res.status(500).json(err);
  }
};

const getOrder = async (req, res) => {
  try {
    const order = await Order.findById(req.params.id);
    res.status(200).json(order);
  } catch (err) {
    res.status(500).json(err);
  }
};

const getAllOrders = async (req, res) => {
  try {
    const orders = await Order.find();
    res.status(200).json(orders);
  } catch (err) {
    res.status(500).json(err);
  }
};

module.exports = {
  updateOrder,
  createOrder,
  deleteOrder,
  getAllOrders,
  userOrders,
  getOrder,
};
