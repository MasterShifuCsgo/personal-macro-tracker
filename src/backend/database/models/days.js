import Joi from "joi"
import mongoose, { Schema } from "mongoose"

export const DaysTypeCheck = Joi.object({
  id: Joi.string().hex().length(24),
  date: Joi.string(), // use getToday().
  foods: Joi.array()
    .items(Joi.string().hex().length(24)) // same as mongoose.Types.ObjectId
    .required(),
})

const DaysSchema = new Schema({
  date: {
    type: String,
    required: true,
    unique: true,
    default: new Date(),
  },
  foods: {
    type: [{ type: mongoose.Schema.Types.ObjectId, ref: "Foods" }],
    required: true,
    default: [],
  },
})

const Days = mongoose.model("Days", DaysSchema)
export default Days
