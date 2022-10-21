const Product = require("../models/product");

// create product
const createProduct = async (req, res) => {
  try {
    const newProduct = new Product(req.body);
    const prod = await newProduct.save();
    res.status(201).json(prod);
  } catch (err) {
    res.status(500).json(err.message);
  }
};

// update product
const updateProduct = (req, res) => {
  try {
    let productId = req.params.id;

    Product.findByIdAndUpdate(
      productId,
      { $set: req.body },
      { new: true },
      (err, data) => {
        if (err || !data) {
          res.status(400).json("Could not update");
        }
        res.status(200).json(data);
      }
    );
  } catch (err) {
    res.status(500).json(err);
  }
};

// get all products
const getAllProducts = async (req, res) => {
  const { page, size } = req.query;

  let limit = parseInt(size);
  const data = await Product.find();
  try {
    const products = await Product.find()
      .skip((page - 1) * size)
      .limit(limit);

    res.status(200).json({
      products: products,
      data,
    });
  } catch (err) {
    res.status(500).json(err.message);
  }
};

// get all products
const getProducts = async (req, res) => {
  try {
    const products = await Product.find().limit(10);

    res.status(200).json({
      products: products,
    });
  } catch (err) {
    res.status(500).json(err.message);
  }
};

// read product
const readProduct = async (req, res) => {
  try {
    let productId = req.params.id;
    const product = await Product.findById(productId);
    res.status(200).json(product);
  } catch (err) {
    res.status(500).json(err);
  }
};

// delete product

const deleteProduct = async (req, res) => {
  try {
    let productId = req.params.id;
    const removedItem = await Product.findByIdAndRemove(productId);
    res.status(200).json(removedItem);
  } catch (err) {
    res.status(500).json(err);
  }
};

// get related products based on category
const relatedProducts = async (req, res) => {
  const limit = req.query.limit ? parseInt(req.query.limit) : 5;
  try {
    const product = await Product.findById(req.params.id);

    const products = await Product.find({ category: product.category }).limit(
      limit
    );

    res.status(200).json(products);
  } catch (err) {
    console.log(err);
  }
};

//list categories used on the product
const listCategories = async (req, res) => {
  try {
    Product.distinct("category,", {}, (err, category) => {
      if (err || !category) res.status(400);
      res.json(category);
    });
  } catch (err) {
    res.status(500).json(err);
  }
};

module.exports = {
  createProduct,
  updateProduct,
  listCategories,
  getAllProducts,
  deleteProduct,
  readProduct,
  getProducts,
  relatedProducts,
};
