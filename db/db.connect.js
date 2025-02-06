const mongoose=require('mongoose');
require('dotenv').config();

const mongoUrl=process.env.MONGODB;

const initializeDatabase=async()=>{
    await mongoose.connect(mongoUrl).then(()=>console.log('Database connected.')).catch(error=>console.log('Database error occur',error));
}

module.exports={initializeDatabase}