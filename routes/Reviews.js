const router = require("express").Router();
const { AddReview } = require("../controller/Reviews");
const { verifyToken } = require("../middlewares/verifyToken");
router.route("/:productId").post(verifyToken, AddReview);

module.exports = router;
