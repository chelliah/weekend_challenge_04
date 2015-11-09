/**
 * Created by aronthomas on 11/6/15.
 */
var express = require('express');
var index = require('./routes/index.js');
var admin = require('./routes/admin.js');
var mongoose = require('mongoose');


mongoose.connect('mongodb://chelliah:E3fmm@ds049624.mongolab.com:49624/message_board')

//sets up app
var app = express();

app.set('port', process.env.PORT || 5000);

app.use('/admin',admin);
app.use('/',index);

app.listen(app.get('port'),function(){
    console.log("Listening on port", app.get('port'))
});