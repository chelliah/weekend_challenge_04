var express = require('express');
var app = express();

var mongoose = require('mongoose');
var Schema = mongoose.Schema;

mongoose.connect('mongodb://chelliah:E3fmm@ds049624.mongolab.com:49624/message_board')

mongoose.model('Post', new Schema({
    name: String,
    title: String,
    text: String,
    date: String
}, {collection: 'posts'}));

var Post = mongoose.model('Post');


app.post('/data',function(req,res){
    console.log(req.body);
    var addedPost = new Post({
        'name': req.body.userName,
        'title': req.body.postTitle,
        'text': req.body.postContent,
        'date': req.body.date
    });
    addedPost.save(function(err,data){
        if(err){
            console.log("There was an error posting data", err)
        }
        res.send(data);
    })
});

app.get('/data', function(req,res){
    Post.find({},function(err,data){
        if(err){
            console.log("There was an error retrieving data", err)
        }
        res.send(data);
    })
});

app.get('/*', function(req,res){
    var file = req.params[0] || 'views/index.html';
    res.sendFile(path.join(__dirname,"./public",file))
});