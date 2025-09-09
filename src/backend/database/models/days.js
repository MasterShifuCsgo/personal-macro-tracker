import mongoose, { Schema } from "mongoose";

const DaysSchema = new Schema({
  date: Date,
  foods: [{ type: mongoose.Schema.Types.ObjectId, ref: "Foods" }]
})

export default Days = mongoose.model("Days", DaysSchema);







