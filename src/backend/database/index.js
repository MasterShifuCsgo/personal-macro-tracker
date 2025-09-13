import mongoose from "mongoose"

export async function connectDB() {
  if (!process.env.MONGODB_URI) throw new Error("MongoDB_URI missing")
  
  if (mongoose.connection.readyState === 1) return mongoose.connection
  await mongoose.connect(process.env.MONGODB_URI, {
    maxPoolSize: 50,
    autoIndex: true, //automatically indexes your models
    serverSelectionTimeoutMS: 5000, // how long the server looks for a healty node to insert or get data 5s
    socketTimeoutMS: 2500, // how long a single operation can be open for before being forcefully closed
  })

  return mongoose.connection
}
