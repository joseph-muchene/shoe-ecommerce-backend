const User = require("../models/user");
const bcrypt = require("bcryptjs");
const createUser = async (req, res) => {
  try {
    const { username, email, password, isAdmin, phone_number } = req.body;
    // check if the user exists
    const registeredUser = await User.findOne({ email });

    if (registeredUser) {
      return res.status(400).json("User already exists");
    } else {
      const salt = await bcrypt.genSalt(10);
      const hashedPassword = await bcrypt.hash(password, salt);

      const newUser = new User({
        username,
        password: hashedPassword,
        email,
        isAdmin,
        phone_number,
      });

      //   save the user
      const user = await newUser.save();
      res.status(200).json(user);
    }
  } catch (err) {
    res.status(500).json(err.message);
  }
};

const updateUser = async (req, res) => {
  const userId = req.params.id;

  try {
    const user = await User.findById(userId);
    // check if the password matches
    if (req.body.password) {
      const salt = await bcrypt.genSalt(10);
      const hashed = await bcrypt.hash(req.body.password, salt);

      req.body.password = hashed;
    }
    User.findByIdAndUpdate(
      userId,
      { $set: req.body },
      { new: true },
      (err, user) => {
        if (err || !user) {
          res.status(400).json("could not update");
        } else {
          res.status(200).json("user updated");
        }
      }
    );
  } catch (err) {
    res.status(500).json(err);
  }
};

const deleteUser = async (req, res) => {
  const userId = req.params.id;

  try {
    await User.deleteOne({ _id: userId });
    res.status(200).json("user was deleted");
  } catch (err) {
    res.status(500).json(err);
  }
};

const getUser = async (req, res) => {
  const userId = req.params.id;

  try {
    const user = await User.findById(userId);
    res.status(200).json(user);
  } catch (err) {
    res.status(500).json(err);
  }
};

const getAllUsers = async (req, res) => {
  try {
    const users = await User.find();
    return res.status(200).json(users);
  } catch (err) {
    res.status(500).json(err);
  }
};

module.exports = { createUser, getAllUsers, updateUser, deleteUser, getUser };
