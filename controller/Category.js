const Category = require("../models/category");

// create category
const createCategory = async (req, res) => {
  try {
    const newcategory = new Category(req.body);
    const category = await newcategory.save();
    res.status(201).json(category);
  } catch (err) {
    res.status(500).json(err);
  }
};

// update category

const updatecategory = async (req, res) => {
  try {
    //   find the category
    let category = await Category.findById(req.params.id);
    category.name = req.body.name;
    await category.save();
    res.json("category updated");
  } catch (err) {
    res.status(500).json(err);
  }
};

// delete category
const deletecategory = async (req, res) => {
  try {
    //   find the category
    let category = await Category.findById(req.params.id);
    if (category !== null) {
      await Category.findByIdAndRemove({ _id: req.params.id });
      res.json("category deleted");
    } else {
      res.status(400).json("category does not exist");
    }
  } catch (err) {
    res.status(500).json(err);
  }
};
// read category
const readcategory = async (req, res) => {
  try {
    //   find the category
    let category = await Category.findById({ _id: req.params.id });
    res.json(category);
  } catch (err) {
    res.status(500).json(err);
  }
};
// get all categories
const getAllCategories = async (req, res) => {
  try {
    const categories = await Category.find();
    res.status(200).json(categories);
  } catch (err) {
    res.status(500).json(err);
  }
};
module.exports = {
  createCategory,
  updatecategory,
  readcategory,
  getAllCategories,
  deletecategory,
};
