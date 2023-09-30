const mongoose = require('mongoose');

const DataBase = async() => {
    await mongoose.connect('mongodb://127.0.0.1:27017/InstaData')
    .then(()=>console.log('Database Connected'))
    .catch((err)=>console.log(err));
}

module.exports = DataBase;