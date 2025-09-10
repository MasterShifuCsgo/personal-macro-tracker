import { Schema } from "mongoose";

const FoodsSchema = new Schema({
  name: { type: String, required: true, unique: true },
  energy: { type: String, required: true },
  kcal: { type: String, required: true },
  protein: { type: String, required: true },
  fat: { type: String, required: true },
  carb: { type: String, required: true },
  fiber: { type: String, required: true },
  salt: { type: String, required: true },
  serving: { type: String, required: true }, //in grams
});

const Foods = mongoose.model("Foods", FoodsSchema);
export default Foods;
