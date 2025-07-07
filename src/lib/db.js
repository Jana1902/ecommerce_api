import mongoose from "mongoose";

export const connectDb = async () => {
  try {
    const db = await mongoose.connect(process.env.MONGODB_URI);
    console.log(`DB connected: ${db.connection.host}`);
  } catch (err) {
    console.log(`DB connection error: ${err}`);
  }
};
