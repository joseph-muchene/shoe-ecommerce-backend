const router = require("express").Router();
const {
  createOrder,
  deleteOrder,
  updateOrder,
  getAllOrders,
  getOrder,
  userOrders,
} = require("../controller/order");
const {
  verifyToken,
  verifyTokenAndAdmin,
  verifyTokenAndAuthorization,
} = require("../middlewares/verifyToken");

router.route("/create").post(verifyToken, createOrder);
router.route("/update/:id").put(verifyTokenAndAdmin, updateOrder);
router.route("/delete/:id").delete(verifyTokenAndAdmin, deleteOrder);
router.route("/").get(verifyTokenAndAdmin, getAllOrders);
router.route("/:id").get(verifyTokenAndAdmin, getOrder);
router.route("/user/:userId").get(verifyTokenAndAuthorization, userOrders);
module.exports = router;
