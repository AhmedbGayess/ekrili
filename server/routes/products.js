const express = require("express");
const passport = require("passport");
const Product = require("../models/Product");
const SubCategory = require("../models/SubCategory");

const router = express.Router();

router.post(
  "/",
  passport.authenticate("jwt", { session: false }),
  async (req, res) => {
    try {
      if (!req.user.admin) {
        return res.status(401).send();
      }
      const product = new Product(req.body);
      await product.save();
      res.send(product);
    } catch (e) {
      res.status(500).send(e);
    }
  }
);

router.get("/:id", async (req, res) => {
  try {
    const subCategory = await SubCategory.findById(req.params.id);
    if (!subCategory) {
      return res.status(404).send("No products found");
    }
    await subCategory.populate("products").execPopulate();
    res.send(subCategory.products);
  } catch (e) {
    res.status(500).send(e);
  }
});

router.get("/single/:id", async (req, res) => {
  try {
    const product = await Product.findById(req.params.id);
    if (!product) {
      return res.status(404).send("No product found");
    }
    res.send(product);
  } catch (e) {
    res.status(500).send(e);
  }
});

router.get("/find/name", async (req, res) => {
  try {
    const name = req.query.name.trim();
    const products = await Product.find({
      name: new RegExp(`.*${name}.*`, "i")
    });
    if (!products) {
      return res.status(404).send("No products found");
    }
    res.send(products);
  } catch (e) {
    res.status(500).send(e);
  }
});

router.patch(
  "/:id",
  passport.authenticate("jwt", { session: false }),
  async (req, res) => {
    try {
      if (!req.user.admin) {
        return res.status(401).send();
      }
      const updates = {
        name: req.body.name,
        description: req.body.description,
        price: req.body.price,
        image: req.body.image
      };
      const updatedProduct = await Product.findOneAndUpdate(
        { _id: req.params.id },
        { $set: updates },
        { new: true }
      );
      res.send(updatedProduct);
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
      if (!req.user.admin) {
        return res.status(401).send();
      }
      const product = await Product.findByIdAndDelete(req.params.id);
      if (!product) {
        res.status(404).send("No product found");
      }
      res.send(product);
    } catch (e) {
      res.status(500).send(e);
    }
  }
);

module.exports = router;
