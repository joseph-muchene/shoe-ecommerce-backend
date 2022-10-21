const router = require("express").Router();
const {
  createUser,
  getUser,
  getAllUsers,
  deleteUser,
  updateUser,
} = require("../controller/user");
const {
  verifyToken,
  verifyTokenAndAdmin,
} = require("../middlewares/verifyToken");
const { userLogin } = require("../controller/Auth");
router.route("/").post(createUser);

router.route("/all").get(verifyTokenAndAdmin, getAllUsers);
router
  .route("/:id")
  .put(verifyToken, updateUser)
  .delete(verifyToken, deleteUser)
  .get(verifyTokenAndAdmin, getUser);
router.route("/login").post(userLogin);
module.exports = router;
