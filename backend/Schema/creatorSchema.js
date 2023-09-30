const mongoose = require('mongoose');

const creatorSchema = new mongoose.Schema({
    username: {
        type: String,
        required: true 
    },
    image: {
        type: String,
        required: true
    },
    password: {
        type: String,
        required: true
    }
})

const CreatorCollection = mongoose.model('creator', creatorSchema);

module.exports = CreatorCollection;