const mongoose = require('mongoose');

const dbConnect = () => {

    try{
        const conn = mongoose.connect('mongodb://localhost:27017/apis')
        console.log('DataBase Connected Successfullyyy....!!!!!!')
    }catch{
        console.log('Database Error....!!!!')
    }

    
    

}

module.exports = dbConnect;