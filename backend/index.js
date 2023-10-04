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
// http://localhost:1000/creators             ALL creators
// http://localhost:1000/creator/add           Add new Creator
// http://localhost:1000/creator/:id           Get particulatar creator
// http://localhost:1000/creator/login          login creator

// http://localhost:1000/posts             All posts
// http://localhost:1000/post/add            Add new post
// http://localhost:1000/post/:id          Get a particular post
// http://localhost:1000/post/data/:id         Get a particular creator's posts
// http://localhost:1000/post/delete/:id     Delete a post