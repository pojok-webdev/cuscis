var express = require('express'),
app = new express(),
setting = require('./appSetting'),
ctrl = require('./controllers'),
con = require('./connection'),
crud = require('./orm/crud'),
master = require('./masters/index'),
bodyParser = require('body-parser')
app.set('views', './views');
app.set('view engine','ejs')
app.use(express.static(__dirname + '/..'));
app.use(bodyParser.json({'limit':'10mb',extended:true}))
app.use(bodyParser.urlencoded({'limit':'10mb',extended:true}))
console.log("DIRNAME",__dirname)
module.exports = {
    app:app,setting:setting,con:con,crud:crud,ctrl:ctrl,
    master:master
}