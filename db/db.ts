import mongoose from "mongoose";

const MONGODB_URI = process.env.DATABASE_URL;

if (!MONGODB_URI) {
  throw new Error(
    "Please define the database connection string inside the environment variables."
  );
}

let cached = (global as any).mongoose || { conn: null, promise: null };

export const connectDB = async () => {
  if(cached.conn) return cached.conn;

  if(!cached.promise){
    cached.promise = mongoose.connect(MONGODB_URI, {
      dbName: "math-app",
      bufferCommands: false,
    }).then((mongoose) => {
      console.log("MongoDB database connected!");
      return mongoose;
    });

    cached.conn = await cached.promise;
    (global as any).mongoose = cached.conn;

    return cached.conn;
  }
}
