const express = require("express");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const passport = require("passport");
const User = require("../models/User");

const router = express.Router();

router.post("/register", (req, res) => {
  const user = new User(req.body);
  bcrypt.genSalt(10, (err, salt) => {
    bcrypt.hash(user.password, salt, async (err, hash) => {
      try {
        if (err) throw err;
        user.password = hash;
        await user.save();
        res.status(201).send(user);
      } catch (e) {
        res.status(500).send(e);
      }
    });
  });
});

router.post("/login", async (req, res) => {
  try {
    const user = await User.findOne({ email: req.body.email });
    if (!user) {
      return res.status(404).send({ login: "Email or password incorrect" });
    }

    bcrypt.compare(req.body.password, user.password).then((isMatch) => {
      if (isMatch) {
        const payload = {
          id: user.id,
          email: user.email,
          isAdmin: user.isAdmin
        };

        jwt.sign(
          payload,
          process.env.JWT_SECRET,
          { expiresIn: 7200 },
          (err, token) => {
            res.json({ token });
          }
        );
      } else {
        return res.status(400).send({ login: "Email or password incorrect" });
      }
    });
  } catch (e) {
    res.send(e);
  }
});

router.get(
  "/current",
  passport.authenticate("jwt", { session: false }),
  async (req, res) => {
    res.send({
      id: req.user.id,
      name: req.user.name,
      email: req.user.email,
      phone: req.user.phone,
      address: req.user.address
    });
  }
);

router.patch(
  "/edit",
  passport.authenticate("jwt", { session: false }),
  async (req, res) => {
    const user = await User.findById(req.user.id);
    if (!user) {
      return res.status(404).send({ user: "No user found" });
    }

    const updates = {
      email: req.body.email,
      password: req.body.password,
      phone: req.body.phone,
      address: req.body.address
    };

    bcrypt.genSalt(10, (err, salt) => {
      bcrypt.hash(updates.password, salt, async (err, hash) => {
        try {
          if (err) throw err;
          updates.password = hash;
          const updatedUser = await User.findOneAndUpdate(
            { _id: req.user.id },
            { $set: updates },
            { new: true }
          );
          res.send(updatedUser);
        } catch (e) {
          res.status(500).send(e);
        }
      });
    });
  }
);

module.exports = router;
