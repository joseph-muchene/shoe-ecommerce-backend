const User = require("../models/user");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
require("dotenv").config();
const userLogin = async (req, res) => {
  try {
    // check if the user exists
    const user = await User.findOne({
      email: req.body.email,
    });

    if (!user) {
      return res.status(404).json("user not found");
    }

    const { password } = req.body;

    const matchedPassword = await bcrypt.compare(password, user.password);

    if (matchedPassword) {
      const payload = {
        user: {
          id: user.id,
          isAdmin: user.isAdmin,
          name: user.username,
        },
      };
      console.log(payload);
      jwt.sign(
        payload,
        process.env.JWT_SECRET,
        { expiresIn: "30d" },
        (err, token) => {
          if (err) throw err;
          const { password, ...other } = user._doc;
          res.status(200).json({ ...other, token });
        }
      );
    } else {
      res.status(400).json("wrong user credentials");
    }

    // match
  } catch (err) {
    res.status(500).json(err);
  }
};

module.exports = { userLogin };
