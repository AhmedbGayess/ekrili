const express = require("express");
const path = require("path");
require("./db/mongoose");
const cors = require("cors");
const passport = require("passport");

const usersRouter = require("./routes/users");
const categoriesRouter = require("./routes/categories");
const subCategoriesRouter = require("./routes/subCategories");
const adsRouter = require("./routes/ads");
const uploadsRouter = require("./routes/uploads");

const app = express();

app.use(express.json());

app.use(cors());

require("./config/passport")(passport);

app.use("/images", express.static("./uploads"));

app.use("/users", usersRouter);
app.use("/categories", categoriesRouter);
app.use("/sub-categories", subCategoriesRouter);
app.use("/ads", adsRouter);
app.use("/upload", uploadsRouter);

app.use(express.static(__dirname + "/static", { dotfiles: "allow" }));

app.use(express.static(path.join(__dirname, "../client/build")));

app.get("*", (req, res) => {
  res.sendFile(
    path.resolve(__dirname + "/../", "client", "build", "index.html")
  );
});

const port = process.env.PORT || 5000;
app.listen(port, () => console.log(`Server is up on port ${port}`));
