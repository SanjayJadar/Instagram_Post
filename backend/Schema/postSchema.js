const mongoose = require('mongoose');

const postSchema = new mongoose.Schema({
    username: {
        type: String,
        required: true
    },
    image: {
        type: String,
        required: true
    },
    tag: {
        type: String,
        required: true
    }
})

const PostsCollection = mongoose.model('post', postSchema);

module.exports = PostsCollection;