const Band = require('../models').Band
const route = require('express').Router()


route.get('/', (req, res) => {
    if (req.session.user) {
        Band.findAll({
            where: {
                userId: parseInt(req.session.user.id)
            }
        })
            .then((bands) => {
                const user = req.session.user;
                res.render('home', { bands,user });
                //res.status(200).send(bands);
            })
            .catch((err) => {
                console.log(err);
                req.session.user = null;
                res.status(500).send({
                    error: "some error occured"
                })
            });
    }
    else {
        res.status(500).send({
            error: "User not logged in"
        })
    }
})


route.post('/create', (req, res) => {
    // We expect the req to have name,email,password,address,college,phn number in it
    // We will create a new user 
    console.log("in post");
    console.log(req.body);
    Band.create({
        name: req.body.name,
        userId: parseInt(req.session.user.id)
    }).then((band) => {
        // res.status(201).send(band)
        res.redirect('/bands');
    }).catch((err) => {
        console.log(err);

        res.status(501).send({

            error: err.errors
        })
    })
})

route.post('/:Id', (req, res) => {
    console.log("yooo");
    console.log(req.params.Id);
    if (req.session.user) {
        Band.destroy({
            where: {
                userId: req.session.user.id,
                id: req.params.Id
            }
        })
            .then((band) => {
                // res.send("removed successfully");
                res.redirect('/bands');
            })
            .catch((err) => {
                res.send("some error occured!!!")
            })
    }
    else {
        res.status(501).send({
            error: "user not logged in"
        })
    }
})


route.get('/edit/:bandId/:bandName', (req, res) => {
    res.render("editBand", { id: req.params.bandId, name: req.params.bandName,user:req.session.user });
});


route.post('/edit/:bandId', (req, res) => {
    console.log("yoooooooooop");
    console.log(req.body.name);
    const updateOps = {};
    updateOps["name"] = req.body.name;
    Band.update(updateOps, { where: { id: req.params.bandId } })
        .then(result => {
            // res.status(200).json({
            //     message: "band updated",
            //     request: {
            //         type: "GET",
            //         url: "http://localhost:3000/bands/"
            //     }
            // });
            res.redirect('/bands');

        })
        .catch(err => {
            res.status(500).json({ error: "some error occurred" });
        });
})

exports = module.exports = route