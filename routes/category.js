const router = require("express").Router();
const {
  createCategory,
  deletecategory,
  updatecategory,
  getAllCategories,
  readcategory,
} = require("../controller/Category");
const { verifyTokenAndAdmin } = require("../middlewares/verifyToken");

router
  .route("/")
  .post(verifyTokenAndAdmin, createCategory)
  .get(getAllCategories);
router
  .route("/:id")
  .put(verifyTokenAndAdmin, updatecategory)
  .delete(verifyTokenAndAdmin, deletecategory)
  .get(readcategory);

module.exports = router;
