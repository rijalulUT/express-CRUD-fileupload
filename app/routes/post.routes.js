module.exports = app =>{
    const posts = require("../controllers/posts.controller")
    let router = require("express").Router()

    //create new post
    router.post("/",posts.create)
    router.put("/image-photos/:id/:title",posts.UploadImagePost)
    
    app.use("/api/posts",router)
}