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

// === Metadata for frontend ===
//written manually
//should look the same as Backend Shema
export const FoodsMetadata = {
  name: { label: "Food Name", type: "text", required: true },
  energy: { label: "Energy", type: "number" },
  kcal: { label: "Calories", type: "number" },
  protein: { label: "Protein (g)", type: "number" },
  fat: { label: "Fat (g)", type: "number" },
  carb: { label: "Carbs (g)", type: "number" },
  fiber: { label: "Fiber (g)", type: "number" },
  salt: { label: "Salt (mg)", type: "number" },
  serving: { label: "Serving Size (g)", type: "number" },
}
