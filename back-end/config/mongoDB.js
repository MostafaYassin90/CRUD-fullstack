import mongoose from "mongoose";
import "dotenv/config";


const connectDB = async () => {
  try {
    await mongoose.connect(`${process.env.MONGODB_URL}`);
    console.log("Conntection Stublished To MongoDB");
  } catch (error) {
    console.log(`Failed To Connect MongoDB == ${error}`);
  }
};

export default connectDB;