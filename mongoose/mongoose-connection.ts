import mongoose from "mongoose";

export async function connectMongoose() {
  if (mongoose.connection.readyState === 1) {
    return mongoose.connection.db; 
  }
  await mongoose.connect(process.env.MONGODB_URL!);
  return mongoose.connection.db;
}
