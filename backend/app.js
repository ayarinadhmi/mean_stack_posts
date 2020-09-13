const express = require("express");
const bodyParser = require("body-parser");
const mongoose = require("mongoose");
const path = require("path");

const app = express();
const postsRoute = require("./routes/posts");
const userRoutes = require("./routes/user");

mongoose
  .connect(
    "mongodb+srv://nadhmi:VlCAP45MiGtYr0Bv@cluster0-ttiqv.mongodb.net/test?w=majority",{useUnifiedTopology: true,useNewUrlParser: true}
  )
  .then(() => {
    console.log("connected to database");
  })
  .catch(() => {
    console.log("aconnecion failed");
  });

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use("/images",express.static(path.join("backend/images")));

app.use((req, res, next) => {
  res.setHeader("Access-Control-Allow-Origin", "*");
  res.setHeader(
    "Access-Control-Allow-Headers",
    "Origin, X-Requested-With, Content-Type, Accept"
  );
  res.setHeader(
    "Access-Control-Allow-Methods",
    "GET, POST, PATCH,PUT,DELETE, OPTIONS"
  );
  next();
});

app.use("/api/posts",postsRoute);
app.use("/api/users",userRoutes);

module.exports = app;
