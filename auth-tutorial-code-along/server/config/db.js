import mongoose from "mongoose";

const connectDB = async () => {
  try {
    const conn = await mongoose.connect(process.env.MONGO_URI);

    console.log(`MongoDB Connected: ${conn.connection.host}`);
  } catch (error) {
    console.log(`\n\n\nerror while connecting to MongoDB`);
    console.error(`Error: ${error.message}`);
    process.exit(1);
  }
};

export default connectDB;
