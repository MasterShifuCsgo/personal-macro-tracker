import mongoose, { Schema } from "mongoose"


const FoodsSchema = new Schema({
  name: { type: String, required: true, unique: true },
  energy: { type: Number, required: true, default: 0 },
  kcal: { type: Number, required: true, default: 0 },
  protein: { type: Number, required: true, default: 0 },
  fat: { type: Number, required: true, default: 0 },
  carb: { type: Number, required: true, default: 0 },
  fiber: { type: Number, required: true, default: 0 },
  salt: { type: Number, required: true, default: 0 },
  serving: { type: Number, required: true, default: 0 }, //in grams
})

const Foods = mongoose.model("Foods", FoodsSchema)
export default Foods
