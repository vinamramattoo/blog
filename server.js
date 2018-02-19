var express = require('express');
var app = express();
var bodyParser = require('body-parser');
const mongoose = require('mongoose');
mongoose.connect('mongodb://localhost/local');

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

function createPost(req, res){
  var post = req.body;
  console.log(post);
  PostModel.create(post);
  res.json(post);
}

app.listen(3000);
