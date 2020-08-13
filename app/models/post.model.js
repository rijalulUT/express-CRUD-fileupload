module.exports = (squelize,Squelize) => {
    const Post = squelize.define("posts",{
        title: {
            type: Squelize.STRING
        },
        description: {
            type: Squelize.STRING
        },
        photo: {
            type: Squelize.STRING
        },
        published: {
            type: Squelize.BOOLEAN
        },
    })
    return Post;
}