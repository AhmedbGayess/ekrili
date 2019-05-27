const express = require("express");
const passport = require("passport");
const CartItem = require("../models/CartItem");
const User = require("../models/User");

const router = express.Router();

router.post(
  "/",
  passport.authenticate("jwt", { session: false }),
  async (req, res) => {
    try {
      const { product, quantity, totalCost } = req.body;
      const cartItem = new CartItem({
        user: req.user.id,
        product,
        quantity,
        totalCost
      });
      await cartItem.save();
      res.status(201).send(cartItem);
    } catch (e) {
      res.status(500).send(e);
    }
  }
);

router.get(
  "/",
  passport.authenticate("jwt", { session: false }),
  async (req, res) => {
    try {
      const user = await User.findById(req.user.id);
      if (!user) {
        return res.status(404).send("No user found");
      }
      await user.populate("cartItems").execPopulate();
      res.send(user.cartItems);
    } catch (e) {
      res.status(500).send(e);
    }
  }
);

router.get(
  "/:id",
  passport.authenticate("jwt", { session: false }),
  async (req, res) => {
    try {
      const cartItem = await CartItem.findById(req.params.id);
      if (!cartItem || cartItem.user.toString() !== req.user.id) {
        return res.status(404).send("No item found");
      }
      res.send(cartItem);
    } catch (e) {
      res.status(500).send(e);
    }
  }
);

router.patch(
  "/:id",
  passport.authenticate("jwt", { session: false }),
  async (req, res) => {
    try {
      const cartItem = await CartItem.findById(req.params.id);
      cartItem.quantity = req.body.quantity;
      cartItem.totalCost = req.body.totalCost;
      await cartItem.save();
      res.send(cartItem);
    } catch (e) {
      res.status(500).send(e);
    }
  }
);

router.delete(
  "/:id",
  passport.authenticate("jwt", { session: false }),
  async (req, res) => {
    try {
      const cartItem = await CartItem.findById(req.params.id);
      if (!cartItem || cartItem.user.toString() !== req.user.id) {
        return res.status(404).send("No item found");
      }
      await cartItem.remove();
      res.send(cartItem);
    } catch (e) {
      res.status(500).send(e);
    }
  }
);

module.exports = router;
