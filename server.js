var express = require('express');
var app = express();
var bodyParser = require('body-parser');


app.use(express.static(__dirname + "/public"));
app.use(bodyParser.json()); // for parsing application/json
app.use(bodyParser.urlencoded({ extended: true })); // for parsing application/x-www-form-urlencoded

app.post("/api/blogPost", createPost);

function createPost(req, res){
  var post = req.body;
  console.log(post);
}

app.listen(3000);
