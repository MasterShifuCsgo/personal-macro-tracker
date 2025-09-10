import mongoose, { Schema } from "mongoose";

const DaysSchema = new Schema({
  date: { type: Date, required: true, unique: true },
  foods: {
    type: [{ type: mongoose.Schema.Types.ObjectId, ref: "Foods" }],
    required: true,
    default: [],
  },
});

const Days = mongoose.model("Days", DaysSchema);
export default Days;
