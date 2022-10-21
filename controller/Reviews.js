const Product = require("../models/product");
const User = require("../models/user");
const AddReview = async (req, res) => {
  try {
    const { rating, comment } = req.body;

    const product = await Product.findById(req.params.productId);

    if (product) {
      console.log(product.reviews);
      const alreadyReviewed = product.reviews.find(
        (r) => r.user.toString() === req.user.user.id.toString()
      );

      if (alreadyReviewed) {
        return res.status(400).json("Product already reviewed");
      }
      let user = await User.findById(req.user.user.id);
      const review = {
        name: user.username,
        rating: Number(rating),
        comment,
        user: req.user.user.id,
      };

      product.reviews.push(review);

      product.numReviews = product.reviews.length;

      product.rating =
        product.reviews.reduce((acc, item) => item.rating + acc, 0) /
        product.reviews.length;

      await product.save();
      res.status(201).json({ message: "Review added" });
    } else {
      res.status(404);
      throw new Error("Product not found");
    }
  } catch (err) {
    res.status(500).json(err);
  }
};

module.exports = { AddReview };
