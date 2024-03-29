var express = require('express'),
app = new express(),
setting = require('./appSetting'),
ctrl = require('./controllers'),
con = require('./connection'),
crud = require('./orm/crud'),
logging = require('./../assets/app/logging'),
master = require('./masters/master'),
sha1 = require('sha1'),
sessions = require('express-session'),
messages = require('./../assets/app/sending/messageproviders'),
bodyParser = require('body-parser'),
categorychildren = require('./masters/categorychildren'),
auth = require('./../assets/app/auth')
app.set('views', './views');
app.set('view engine','ejs')
app.use(express.static(__dirname + '/..'));
app.use(bodyParser.json({'limit':'10mb',extended:true}))
app.use(bodyParser.urlencoded({'limit':'10mb',extended:true}))
app.use(sessions({
    secret:'haha',
    saveUninitialized:true,
    cookie:{maxAge:1000*24*60*60},
    resave:false
}))
console.log("DIRNAME",__dirname)
module.exports = {
    app:app,
    setting:setting,
    con:con,
    crud:crud,
    ctrl:ctrl,
    messages:messages,
    sha1:sha1,
    auth:auth,
    logging:logging,
    master:master,
    categorychildren:categorychildren
}