const mongoose = require("mongoose");
require("dotenv").config();

const connectDB = async ()=>{
 try{
    await mongoose.connect(process.env.connectionURL);
    console.log("DataBase connected ...");
 }catch(err){
    console.log("Database Error :",err.message);
 }
}
module.exports = connectDB;