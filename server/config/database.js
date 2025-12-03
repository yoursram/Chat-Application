const mongoose = require("mongoose");
// const connectionURL = "mongodb+srv://ram123:ram@1234@chat-application.nwh8goy.mongodb.net/"
const connectDB = async ()=>{
 try{
    await mongoose.connect("mongodb+srv://ram123:ram%401234@chat-application.nwh8goy.mongodb.net/");
    console.log("DataBase connected ...");
 }catch(err){
    console.log("Database Error :",err.message);
 }
}
module.exports = connectDB;