const db = require("../models/index")
const Post = db.posts
const Op = db.Sequelize.Op
const jwt = require("jsonwebtoken")
const slack = require("../slack/test_thirdparty.slack")
exports.findAll = (req,res) =>{
    const title = req.query.title
    let condition = title ? {title : { [Op.like]: `%${title}%` }} : null

    Post.findAll({ where : condition})
        .then((data)=> {
            res.send(data)
        }).catch((err)=> {
            res.status(500).send({
                message : err.message || "some error occured"
            })
        })
}
//post
exports.create = (req, res) =>{
    var user = (jwt.verify(req.headers.token,process.env.SECRET))
    console.log(`user ${user.id}`)
    //Validate request
    if (!req.body.title) {
        res.status(400).send(
            {
                message: "Content cannot be empty"
            }
        )
        return
    }

    //Create Post
    const post = {
        title: req.body.title,
        description: req.body.description,
        photo: "-",
        published: req.body.published ? req.body.published : false
    }
    Post.create(post)
        .then((data)=>{
            res.send(data)
        }).catch((err)=>{
            res.status(500).send({
                message: err.message || "some error occured while creating Post"
            })
        })
        slack.sendMessage("Laras","test_thirdparty",post.title)
}

exports.UploadImagePost = async (req,res) =>{
    const id = req.params.id
    const title = req.params.title
    
    try {
        if (!req.files) {
           res.send({
               status: false,
               message: 'No file uploaded'
           }) 
        } else {
            //Use the name of input field
            let photo = req.files.photo
            var renamePhoto = +id
            +"-"
            +title
            +(photo.name).substring((photo.name).indexOf("."))

            Post.update({
                photo: renamePhoto
            },{
                where: {id: id}
            }).then((result)=>{
                if (result == 1) {
                    photo.mv("./uploads/"+renamePhoto)

                    //send response
                    res.send({
                        status: true,
                        message: 'Photo post File is Uploaded',
                        data: {
                            name: photo.name,
                            rename: renamePhoto,
                            mimetype: photo.mimetype,
                            size: photo.size
                        }
                    })
                } else {
                    res.send({
                        message: `Cannot Update post id = ${id}`
                    })
                }
            })
        }
    } catch (err) {
        res.status(500).send(err)
    }
}
