import mongoose from "mongoose";

const connectDB = async () => {
  try {
    const conn = mongoose.connect(process.env.MONGO_URI);
    console.log(`Mongo DB Connected`);
  } catch (error) {
    console.log(`Error :${error.message}`);
    process.exit(1);
  }
};

export default connectDB;
