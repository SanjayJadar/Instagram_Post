const mongoose = require('mongoose');
const express = require('express');
const CreatorCollection = require('../Schema/creatorSchema');
const router = express.Router(); 

// Middle ware to parse json data
router.use(express.json()) 

// Get data of all Creators
router.get('/creators', (req, res)=>{
    CreatorCollection.find({})
    .then(data=>res.json(data))
    .catch(err=>res.json(err))
})

// Post new creator
router.post('/creator/add', async(req, res)=>{ 
    try{
        const check = await CreatorCollection.findOne({ username:req.body.username })
        if(check){
           return res.send('Exist');
        } 
        let data = await CreatorCollection.insertMany(req.body) 
        res.json(data);
    } 
    catch(e){
        res.send(e.message)  
    }
}) 

// Get a particular creator
router.get('/creator/:id', (req, res)=>{
    let id = req.params.id;
    CreatorCollection.findById({_id:id})
    .then(data=>res.json(data))
    .catch(err=>res.send(err))
})

// Get a particular creator at verify
router.post('/creator/login', async(req, res)=>{ 
    try{
        const check = await CreatorCollection.findOne({username:req.body.username, password:req.body.password})
        if(check){
            res.json(check);
        }
        else{
            res.send('invalid') 
        }
    } 
    catch(e){
        res.send(e.message) 
    }
})

module.exports = router;