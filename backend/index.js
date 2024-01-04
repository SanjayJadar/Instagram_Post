const express = require('express');
const cors = require('cors');
const DataBase = require('./db'); 
const server = express();

server.use(cors()); 
 

// Connect to Database (MongoDB)
DataBase();

// Posts
server.use('/', require('./Routes/Posts')); 

// Creators
server.use('/', require('./Routes/Creators'));

// Connect to Server
const port = process.env.PORT || 3000
server.listen(port, ()=>{
    console.log('Server Connected'+port);
})



// ALL REquests
// https://instagram-post.onrender.com//creators             ALL creators
// https://instagram-post.onrender.com//creator/add           Add new Creator
// https://instagram-post.onrender.com//creator/:id           Get particulatar creator
// https://instagram-post.onrender.com//creator/login          login creator

// https://instagram-post.onrender.com//posts             All posts
// https://instagram-post.onrender.com//post/add            Add new post
// https://instagram-post.onrender.com//post/:id          Get a particular post
// https://instagram-post.onrender.com//post/data/:id         Get a particular creator's posts
// https://instagram-post.onrender.com//post/delete/:id     Delete a post