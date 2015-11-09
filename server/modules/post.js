/**
 * Created by aronthomas on 11/8/15.
 */
var mongoose = require('mongoose');
var Schema = mongoose.Schema;


var Post = new Schema({
        name: String,
        title: String,
        text: String,
        date: String
    }, {collection: 'posts'});



module.exports = Post;