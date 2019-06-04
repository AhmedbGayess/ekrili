const express = require("express");
const passport = require("passport");
const Category = require("../models/Category");

const router = express.Router();

router.post(
  "/",
  passport.authenticate("jwt", { session: false }),
  async (req, res) => {
    try {
      if (!req.user.admin) {
        return res.status(401).send();
      }
      const newCategory = new Category(req.body);
      await newCategory.save();
      res.status(201).send(newCategory);
    } catch (e) {
      res.status(500).send(e);
    }
  }
);

router.get("/", async (req, res) => {
  try {
    const categories = await Category.find();
    if (!categories) {
      return res.status(404).send("No categories found");
    }
    res.send(categories);
  } catch (e) {
    res.status(500).send(e);
  }
});

router.get("/:id", async (req, res) => {
  try {
    const category = await Category.findById(req.params.id);
    if (!category) {
      return res.status(404).send("No category found");
    }
    res.send(category);
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
      const category = await Category.findById(req.params.id);
      if (!category) {
        return res.status(404).send("No category found");
      }
      category.name = req.body.name;
      await category.save();
      res.send(category);
    } catch (e) {
      res.status(500).send(e);
    }
  }
);

// router.delete(
//   "/:id",
//   passport.authenticate("jwt", { session: false }),
//   async (req, res) => {
//     try {
//       if (!req.user.admin) {
//         return res.status(401).send();
//       }
//       const category = await Category.findByIdAndDelete(req.params.id);
//       if (!category) {
//         res.status(404).send("No category found");
//       }
//       res.send(category);
//     } catch (e) {
//       res.status(500).send(e);
//     }
//   }
// );

module.exports = router;
