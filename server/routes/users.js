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
        const payload = {
          id: user._id,
          email: user.email,
          admin: user.admin,
          name: user.name,
          phone: user.phone,
          image: user.image,
          bio: user.bio
        };

        jwt.sign(
          payload,
          process.env.JWT_SECRET,
          { expiresIn: 7200 },
          (err, token) => {
            res.json({ token });
          }
        );
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
          admin: user.admin,
          name: user.name,
          phone: user.phone,
          image: user.image,
          bio: user.bio
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
      address: req.user.address,
      bio: req.user.bio
    });
  }
);

router.patch(
  "/edit",
  passport.authenticate("jwt", { session: false }),
  async (req, res) => {
    try {
      const user = await User.findById(req.user.id);
      if (!user) {
        return res.status(404).send({ user: "No user found" });
      }

      const updates = {
        email: req.body.email,
        password: req.body.password || req.user.password,
        phone: req.body.phone,
        bio: req.body.bio
      };

      bcrypt.genSalt(10, (err, salt) => {
        bcrypt.hash(updates.password, salt, async (err, hash) => {
          try {
            if (err) throw err;
            if (req.body.password) {
              updates.password = hash;
            }
            const updatedUser = await User.findOneAndUpdate(
              { _id: req.user.id },
              { $set: updates },
              { new: true }
            );
            const payload = {
              id: updatedUser._id,
              email: updatedUser.email,
              admin: updatedUser.admin,
              name: updatedUser.name,
              phone: updatedUser.phone,
              image: updatedUser.image,
              bio: updatedUser.bio
            };

            jwt.sign(
              payload,
              process.env.JWT_SECRET,
              { expiresIn: 7200 },
              (err, token) => {
                res.json({ token });
              }
            );
          } catch (e) {
            res.status(500).send(e);
          }
        });
      });
    } catch (e) {
      res.status(500).send(e);
    }
  }
);

router.get(
  "/all",
  passport.authenticate("jwt", { session: false }),
  async (req, res) => {
    try {
      if (!req.user.admin) {
        return res.status(401).send();
      }
      const skip = parseInt(req.query.skip) || 0;
      const users = await User.find()
        .limit(10)
        .skip(skip)
        .sort({ createdAt: -1 });
      if (!users) {
        return res.status(404).send("No users found");
      }
      res.send(users);
    } catch (e) {
      res.status(500).send(e);
    }
  }
);

router.get("/:id", async (req, res) => {
  try {
    const user = await User.findById(req.params.id);
    if (!user) {
      res.status(404).send("No user found");
    }
    res.send({
      id: user._id,
      email: user.email,
      name: user.name,
      phone: user.phone,
      image: user.image,
      bio: user.bio
    });
  } catch (e) {
    res.status(500).send(e);
  }
});

router.delete(
  "/:id",
  passport.authenticate("jwt", { session: false }),
  async (req, res) => {
    try {
      if (!req.user.admin) {
        return res.status(401).send();
      }
      const user = await User.findByIdAndDelete(req.params.id);
      if (!user) {
        res.status(404).send("No user found");
      }
      res.send(user);
    } catch (e) {
      res.status(500).send(e);
    }
  }
);

router.post(
  "/image/:image",
  passport.authenticate("jwt", { session: false }),
  async (req, res) => {
    try {
      const user = await User.findById(req.user.id);
      if (!user) {
        return res.status(404).send({ user: "No user found" });
      }
      user.image = req.params.image;
      await user.save();
      const payload = {
        id: user._id,
        email: user.email,
        admin: user.admin,
        name: user.name,
        phone: user.phone,
        image: user.image
      };

      jwt.sign(
        payload,
        process.env.JWT_SECRET,
        { expiresIn: 7200 },
        (err, token) => {
          res.json({ token });
        }
      );
    } catch (e) {
      res.status(500).send(e);
    }
  }
);

router.delete(
  "/delete/image",
  passport.authenticate("jwt", { session: false }),
  async (req, res) => {
    try {
      const user = await User.findById(req.user.id);
      if (!user) {
        return res.status(404).send({ user: "No user found" });
      }
      user.image = "";
      await user.save();
      const payload = {
        id: user._id,
        email: user.email,
        admin: user.admin,
        name: user.name,
        phone: user.phone,
        image: user.image
      };

      jwt.sign(
        payload,
        process.env.JWT_SECRET,
        { expiresIn: 7200 },
        (err, token) => {
          res.json({ token });
        }
      );
    } catch (e) {
      res.status(500).send(e);
    }
  }
);

module.exports = router;
