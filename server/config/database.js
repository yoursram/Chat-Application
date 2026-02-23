import mongoose from "mongoose"
// const connectionURL = "mongodb+srv://ram123:ram@1234@chat-application.nwh8goy.mongodb.net/"
const connectDB = async ()=>{
 try{
    await mongoose.connect(process.env.connectionURL);
    console.log("DataBase connected ...");
 }catch(err){
    console.log("Database Error :",err.message);
 }
}
module.exports = connectDB;
