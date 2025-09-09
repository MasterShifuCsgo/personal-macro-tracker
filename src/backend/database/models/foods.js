import { Schema } from "mongoose";

const FoodsSchema = new Schema({
 name: String,
 energy: Number,
 kcal: Number,
 protein: Number,
 fat: Number,
 carb: Number,
 fiber: Number,
 salt: Number,
 serving: Number //in grams (whats on the package)
})

export const Foods = mongoose.model("Foods", FoodsSchema);



