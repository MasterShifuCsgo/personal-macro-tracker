import Foods from "../../../../database/models/foods.js"
import { FoodsTypeCheck } from "../../../../../shared/FoodsSchema.js";


/**
 * expects 'food' field in send body
 */
export default async function CreateFood(req, res) {
  //get newfood
  const newFood = req.body["food"]  
  const { error } = FoodsTypeCheck.fork(['id'], (schema) => { return schema.optional() }).validate(newFood);
  if (error) {
    return res.status(400).send({ error: error.details[0].message });
  }

  //dont allow foods with similar names
  if (await Foods.exists({ name: newFood.name })) {
    return res
      .status(400)
      .send({ error: "Food with similar name already exists" })
  }

  //create food with all fields provided, rest are null if not provided.
  Foods.create(newFood)
    .then((doc) => console.log(doc))
    .catch((err) => console.log(err))
  res.sendStatus(204)
}
