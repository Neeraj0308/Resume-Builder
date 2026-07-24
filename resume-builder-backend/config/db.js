import mongoose from "mongoose";

const connectDB = async (retries = 2, delay = 5000) => {
  const mongoUri = process.env.MONGO_URI;

  // console.log("🔗 Attempting to connect to MongoDB..." ,mongoUri );
  
  if (!mongoUri) {
    throw new Error("MONGO_URI is not defined in .env file");
  }

  for (let attempt = 1; attempt <= retries; attempt++) {
    try {
      console.log(`📡 MongoDB Connection Attempt ${attempt}/${retries}...`);
      
      await mongoose.connect(mongoUri, {
        connectTimeoutMS: 10000,
        serverSelectionTimeoutMS: 10000,
      });

      console.log("✅ MongoDB Connected Successfully");
      return true;
    } catch (error) {
      console.error(`❌ MongoDB Connection Failed (Attempt ${attempt}/${retries})`);
      console.error("Error:", error.message);
      
      if (attempt === retries) {
        // Final attempt failed
        console.error("\n❌ All connection attempts failed!");
        console.error("\n💡 Troubleshooting Steps:");
        
        if (error.message.includes("ECONNREFUSED") || error.message.includes("ENOTFOUND")) {
          console.error("1. Check your internet connection");
          console.error("2. Verify MongoDB Atlas cluster is running");
          console.error("3. Add your IP to MongoDB Atlas IP Whitelist:");
          console.error("   - Go to: Security → Network Access");
          console.error("   - Add: Your current IP or 0.0.0.0/0 for development");
        } else if (error.message.includes("authentication failed")) {
          console.error("1. Verify your MongoDB credentials in .env");
          console.error("2. Check username and password are URL-encoded if needed");
        }
        
        console.error("\n📌 To use local MongoDB instead, update .env:");
        console.error("   MONGO_URI=mongodb://localhost:27017/resume_builder");
        
        throw error;
      }
      
      if (attempt < retries) {
        console.log(`⏳ Retrying in ${delay / 1000} seconds...\n`);
        await new Promise(resolve => setTimeout(resolve, delay));
      }
    }
  }
};

export default connectDB;