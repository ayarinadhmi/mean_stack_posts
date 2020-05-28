const express = require("express");
const bodyParser = require("body-parser");
const Post = require("./model/post");
const mongoose = require("mongoose");

const app = express();

mongoose
  .connect(
    "mongodb+srv://nadhmi:6jVuu1hRwfmSdmMk@cluster0-ttiqv.mongodb.net/test?retryWrites=true&w=majority",{useUnifiedTopology: true,useNewUrlParser: true}
  )
  .then(() => {
    console.log("connected to database");
  })
  .catch(() => {
    console.log("aconnecion failed");
  });

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));

app.use((req, res, next) => {
  res.setHeader("Access-Control-Allow-Origin", "*");
  res.setHeader(
    "Access-Control-Allow-Headers",
    "Origin, X-Requested-With, Content-Type, Accept"
  );
  res.setHeader(
    "Access-Control-Allow-Methods",
    "GET, POST, PATCH, DELETE, OPTIONS"
  );
  next();
});

app.post("/api/posts", (req, res, next) => {
  const post = new Post({
    title: req.body.title,
    content: req.body.content
  });
  post.save().then((post)=>{
    res.status(201).json({
      postData: post._id,
      message: "Post added successfully"
    });
  });
  
});

app.get("/api/posts", (req, res, next) => {
  Post.find().then(documents => {
    
    res.status(200).json({
      message: "Posts fetched successfully!",
      posts: documents
    });
  });
  
});
app.delete("/api/posts/:id", (req, res, next) => {
  Post.deleteOne({_id:req.params.id}).then(result=>{
    res.status(200).json({message:"post deleted successfully"});
  });
});
module.exports = app;
