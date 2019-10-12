const route = require('express').Router()

route.use('/users', require('./users'))

route.use('/bands', require('./bands'))

route.get('/',(req,res)=>{
        res.redirect('../users/signin');  
    }); 
exports = module.exports = {
    route
} 
 
