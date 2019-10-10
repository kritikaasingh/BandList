const Band = require('../models').Band
const route = require('express').Router()

route.post('/create', (req, res) => {
    // We expect the req to have name,email,password,address,college,phn number in it
    // We will create a new user 
    console.log("in post");
    console.log(req.body);
    Band.create({
        name: req.body.name,
        userId: parseInt(req.session.user.id)
    }).then((band) => {
        res.status(201).send(band)
    }).catch((err) => {
        console.log(err);

        res.status(501).send({

            error: err.errors
        })
    })
})

exports = module.exports = route 