const mongoose = require('mongoose');
const express = require('express');
const PostsCollection = require('../Schema/postSchema');
const router = express.Router();

// Middle ware to parse json data
router.use(express.json()) 

// Get data from posts
router.get('/posts', async(req,res)=>{
    await PostsCollection.find({})
    .then(data=>res.json(data))
    .catch(err=>res.json(err))
})

// Post new post
router.post('/post/add', async(req, res)=>{
    await PostsCollection.create(req.body)
    .then(data=>res.json(data))
    .catch(err=>res.json(err))
})

// Get particular post
router.get('/post/:id', async(req, res)=>{
    let id = req.params.id;
    await PostsCollection.findById({_id:id})
    .then(data=>res.json(data))
    .catch(err=>res.json(err))
})

// Get creator's posts
router.get('/post/data/:id', async(req, res)=>{
    let id = req.params.id;
    await PostsCollection.find({username:id})
    .then(data=>res.json(data))
    .catch(err=>res.json(err))
})

router.delete('/post/delete/:id', async(req, res)=>{
    let id = req.params.id;
    await PostsCollection.findByIdAndDelete({_id:id})
    .then(data=>res.json(data))
    .catch(err=>res.json(err))
})

module.exports = router;