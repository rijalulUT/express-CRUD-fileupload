module.exports = app =>{
    const posts = require("../controllers/posts.controller")
    const auth = require("../middleware/auth")
    let router = require("express").Router()

    //create new post
    router.get("/",posts.findAll)
    router.post("/",posts.create)
    router.put("/image-photos/:id/:title",posts.UploadImagePost)
    
    app.use("/api/posts",auth.isAuth,router)
}