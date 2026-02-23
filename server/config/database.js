const mongoose = require("mongoose");

const connectDB = async () => {
   try {
      const uri = process.env.MONGO_URI || process.env.connectionURL || "mongodb://127.0.0.1:27017/chat";
      await mongoose.connect(uri, {
         useNewUrlParser: true,
         useUnifiedTopology: true,
      });
      console.log("Database connected");
   } catch (err) {
      console.error("Database Error:", err.message);
      throw err;
   }
};

module.exports = connectDB;
