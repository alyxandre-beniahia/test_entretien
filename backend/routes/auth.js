const express = require("express");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const User = require("../models/User");
const authMiddleware = require("../middleware/authMiddleware");

const router = express.Router();

router.post("/register", async (req, res) => {
  const { username, email, password } = req.body;

  try {
    let user = await User.findOne({ email });
    if (user) {
      return res.status(400).json({ msg: "Email already exists" });
    }

    user = await User.findOne({ username });
    if (user) {
      return res.status(400).json({ msg: "Username already exists" });
    }

    user = new User({
      username,
      email,
      password,
    });

    const salt = await bcrypt.genSalt(10);
    user.password = await bcrypt.hash(password, salt);

    await user.save();

    const payload = {
      user: {
        id: user.id,
      },
    };

    jwt.sign(payload, "secret", { expiresIn: 360000 }, (err, token) => {
      if (err) throw err;
      res.json({ token });
    });
  } catch (err) {
    console.error(err.message);
    res.status(500).send("Server error");
  }
});

router.post("/login", async (req, res) => {
  const { email, password } = req.body;

  try {
    let user = await User.findOne({ email });
    if (!user) {
      return res.status(400).json({ msg: "Invalid Credentials" });
    }

    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) {
      return res.status(400).json({ msg: "Invalid Credentials" });
    }

    const payload = {
      user: {
        id: user.id,
      },
    };

    jwt.sign(payload, "secret", { expiresIn: 360000 }, (err, token) => {
      if (err) throw err;
      res.json({ token });
    });
  } catch (err) {
    console.error(err.message);
    res.status(500).send("Server error");
  }
});

router.get("/me", authMiddleware, async (req, res) => {
  try {
    res.json(req.user);
  } catch (err) {
    console.error(err.message);
    res.status(500).send("Server error");
  }
});

router.put("/me", async (req, res) => {
  try {
    const { username, email, password, newPassword, bio, id } = req.body;

    const user = await User.findById(id);
    console.log(user);

    if (newPassword) {
      const isMatch = await bcrypt.compare(password, user.password);

      if (!isMatch) {
        return res.status(400).json({ msg: "Invalid credentials" });
      }

      const salt = await bcrypt.genSalt(10);
      const hashedPassword = await bcrypt.hash(newPassword, salt);

      user.password = hashedPassword;
    }

    user.username = username;
    user.email = email;
    user.bio = bio;

    await user.save();

    res.json({ msg: "Profile updated successfully" });
    console.log(user);
  } catch (err) {
    console.error(err.message);
    res.status(500).send("Server error");
  }
});

router.delete("/me", authMiddleware, async (req, res) => {
  console.log(req.user);
  try {
    await User.findByIdAndDelete(req.user.id);
    res.json({ msg: "User deleted" });
  } catch (err) {
    console.error(err.message);
    res.status(500).send("Server error");
  }
});

module.exports = router;
