/**
 * Created by aronthomas on 11/6/15.
 */
var express = require('express');
var path = require('path');
var bodyParser = require('body-parser');
var mongoose = require('mongoose');
var Schema = mongoose.Schema;

//sets up app
var app = express();

//mongoose stuff
//mongoose.connect('mongodb://localhost/weekend_challenge_message_board');
mongoose.connect('mongodb://chelliah:E3fmm@ds049624.mongolab.com:49624/message_board')

mongoose.model('Post', new Schema({
    name: String,
    title: String,
    text: String,
    date: String
}, {collection: 'posts'}));

var Post = mongoose.model('Post');

app.set('port', process.env.PORT || 5000);

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({expanded : true}));

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

app.listen(app.get('port'),function(){
    console.log("Listening on port", app.get('port'))
});