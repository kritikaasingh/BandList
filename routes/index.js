const route = require('express').Router()

route.use('/users', require('./users'))

route.use('/bands', require('./bands'))

exports = module.exports = {
    route
} 
 
