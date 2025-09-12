import mongoose, { Schema } from "mongoose"
import Joi from "joi"

export const FoodsTypeCheck = new Joi.object({
  id: Joi.string().hex().length(24),
  name: Joi.string().max(64).required(),
  energy: Joi.number().integer(), // doesn't have required because schema has default values, sets unset values automatically.
  kcal: Joi.number().integer(),
  protein: Joi.number().integer(),
  fat: Joi.number().integer(),
  carb: Joi.number().integer(),
  fiber: Joi.number().integer(),
  salt: Joi.number().integer(),
  serving: Joi.number().integer(),
})

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
