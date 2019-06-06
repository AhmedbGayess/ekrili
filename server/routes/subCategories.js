const express = require("express");
const passport = require("passport");
const SubCategory = require("../models/SubCategory");
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
      const category = await Category.findById(req.body.category);
      if (!category) {
        return res.status(404).send("No category found");
      }
      const newSubCategory = new SubCategory(req.body);
      await newSubCategory.save();
      res.status(201).send(newSubCategory);
    } catch (e) {
      res.status(500).send(e);
    }
  }
);

router.get("/", async (req, res) => {
  try {
    const subCategories = await SubCategory.find();
    if (!subCategories) {
      return res.status(404).send("No subcategories found");
    }
    res.send(subCategories);
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
    await category.populate("subCategories").execPopulate();
    res.send(category.subCategories);
  } catch (e) {
    res.status(500).send(e);
  }
});

router.get("/single/:id", async (req, res) => {
  try {
    const subCategory = await SubCategory.findById(req.params.id);
    if (!subCategory) {
      return res.status(404).send("No subcategory found");
    }
    res.send(subCategory);
  } catch (e) {
    res.status(500).send(e);
  }
});

router.patch(
  "/:id",
  passport.authenticate("jwt", { session: false }),
  async (req, res) => {
    if (!req.user.admin) {
      return res.status(401).send();
    }

    const updates = Object.keys(req.body);
    const allowedUpdates = ["name", "image", "category"];

    const isValidOperation = updates.every((update) =>
      allowedUpdates.includes(update)
    );

    if (!isValidOperation) {
      return res.status(400).send({ error: "Invalid updates." });
    }

    try {
      const subCategory = await SubCategory.findById(req.params.id);
      if (!subCategory) {
        return res.status(404).send("No subcategory found");
      }
      updates.forEach((update) => (subCategory[update] = req.body[update]));
      await subCategory.save();
      res.send(subCategory);
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
//       const subCategory = await SubCategory.findByIdAndDelete(req.params.id);
//       if (!subCategory) {
//         res.status(404).send("No subcategory found");
//       }
//       res.send(subCategory);
//     } catch (e) {
//       res.status(500).send(e);
//     }
//   }
// );

module.exports = router;
