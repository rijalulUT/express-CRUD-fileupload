var jwt = require('jsonwebtoken')
var bcrypt = require('bcrypt')

const db = require('../models/index')
const User = db.users

//register
exports.signup = function (req,res) {
    //Validate Request
    if (!req.body.email || !req.body.password) {
        res.status(400).send(
            {
                message: "Content cannot be empty"
            }
        )
        return
    }

    //Create User
    var salt = bcrypt.genSaltSync(10)
    var hash = bcrypt.hashSync(req.body.password,salt)
    
    const user = {
        firstname : req.body.firstname,
        lastname  : req.body.lastname,
        password  : hash,
        email     : req.body.email
    }

    User.create(user)
        .then((data) =>{
            res.send(data)
        }).catch((err)=>{
            res.status(500).send({
                message : err.message || "some error occured"
            })
        })
}