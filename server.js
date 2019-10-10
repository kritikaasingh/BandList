const express = require('express')
var session = require('express-session');

const app = express();

app.use(session({ secret: 'Kritika', saveUninitialized: true, resave: false }));
app.use(express.json())
app.use(express.urlencoded({ extended: true }))

app.use('/', require('./routes').route)

app.set('port', process.env.PORT || 3000)
app.listen(app.get('port'), function () {
    console.log('server started at http://localhost:3000/');

}) 