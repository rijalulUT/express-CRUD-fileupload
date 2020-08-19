var jwt = require('jsonwebtoken')
var bcrypt = require('bcrypt')
//const process = require("dotenv")
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

exports.signin = function (req, res){
    var email = req.body.email
    var pass  = req.body.password

    User.findOne({where : {email: email}})
        .then((data)=> {
            var hasil = bcrypt.compareSync(pass, data.password)
            //console.log(hasil)

            if (hasil == true) {
                var secret = process.env.SECRET
                //console.log(secret)
                //var now    = Math.floor(Date.now() /  1000)
                //var iat    = (now - 10)

                var expiresIn = "30 days" //second

                //var jwtId   = Math.random().toString(36).substring(7)
                // var payload = {
                //     iat: iat,
                //     jwtid: jwtId,
                //     audience: 'TEST',
                //     data: data
                // }

                jwt.sign({id:data.id},secret, {
                    algorithm: 'HS256',
                    expiresIn: expiresIn
                },
                    function(err,token) {
                        if (err) {
                            res.json({
                                "results":
                                {
                                    "status" : false,
                                    "msg"    : "Error Occured"
                                }
                            })
                        } else {
                            if (token != false) {
                                res.header()
                                res.json({
                                    "results":
                                    {
                                        "status":true,
                                        "token": token,
                                        "user": {
                                            id : data.id
                                        }
                                    }
                                })
                                res.end()
                            }else{
                                res.json({
                                    "results":
                                    {"status": false}
                                })
                                res.end()
                            }
                        }                       
                    }
              )
            }else{
                res.send({
                    message: `Error retrieving post with id = ${err}`
                })
                res.end()
            }
        }).catch((err) => {
            res.status(500).send({
                message: `Error retrieving post with id = ${err}`
            })
        })
}