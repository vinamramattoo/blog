var express = require('express');
var app = express();
var bodyParser = require('body-parser');
const mongoose = require('mongoose');
mongoose.connect('mongodb://localhost/blog');

//db scheme
var PostScheme = mongoose.Schema({
    title: {type: String, required:true},
    body: String,
    tag: {type: String, enum: ['POLITICS','ECONOMY','TECHNOLOGY','EDUCATION']},
    posted : {type: Date, default: Date.now}
}, {collection: 'post'});

//OBJECT THAT ALLOWS TO INTERACT WITH DB
var PostModel = mongoose.model("PostModel", PostScheme);



app.use(express.static(__dirname + "/public"));
app.use(bodyParser.json()); // for parsing application/json
app.use(bodyParser.urlencoded({ extended: true })); // for parsing application/x-www-form-urlencoded

app.post("/api/blogPost", createPost);
app.get("/api/blogPost", getAllPosts);
app.delete("/api/blogPost/:id", deletePosts);
app.get("/api/blogPost/:id", getPost);

// models
function getAllPosts(req,res){
  console.log("reached getAllPosts");
  PostModel
    .find()
    .then(
      function(obj){
        res.json(obj);
      },
      function(error){
        res.sendStatus(400);
      }
    )
}

function createPost(req, res){
  var post = req.body;
  PostModel.create(post)
  .then(
    function(obj){res.json(200);}
    ,function(error){res.sendStatus(400);}
  )
}


function deletePosts(req, res){
  var postId = req.params.id;
  PostModel.remove({_id: postId})
  .then(
    function(obj){res.sendStatus(200);}
    ,function(error){res.sendStatus(400);}
  )
}

function getPost(req, res){
  var postId = req.params.id;
  PostModel.findById(postId)
  .then(
    function(obj){res.json(obj);}
    ,function(error){res.sendStatus(400);}
  )
}

app.listen(3000);
