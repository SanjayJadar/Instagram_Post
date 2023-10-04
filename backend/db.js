const mongoose = require('mongoose');

const DataBase = async() => {
    await mongoose.connect('mongodb+srv://sanjayjadar53:VD2Ardjzr4tIekON@portfolio.76hvi7e.mongodb.net/InstaData?retryWrites=true&w=majority')
    .then(()=>console.log('Database Connected'))
    .catch((err)=>console.log(err));
}

module.exports = DataBase;