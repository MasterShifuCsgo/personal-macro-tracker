import mongoose from "mongoose"

export async function connectDB() {
  if (!process.env.MONGODB_URI) throw new Error("MongoDB_URI missing")

  if (mongoose.connection.readyState === 1) return mongoose.connection
  await mongoose.connect(process.env.MONGODB_URI, {
    maxPoolSize: 10,
  })

  return mongoose.connection
}
