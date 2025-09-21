import Foods from "../../../../database/models/foods.js"
import { FoodsTypeCheck } from "../../../../../shared/FoodsSchema.js"



export default async function DeleteFood(req, res) {
  //get food_id
  const id = req.query["food_id"]

  const { error } = FoodsTypeCheck.extract("id").validate(id)
  if (error) {
    return res.status(400).send({ error: error.details[0].message })
  }

  //if food doesn't exist
  if (!(await Foods.exists({ _id: id }))) {
    //error
    return res
      .status(400)
      .send({ error: `food with id '${id}' doesn't exist` })
  }

  //delete
  Foods.findByIdAndDelete(id)
    .catch((err) => console.err(`failed to delete: ${id}.\n ${err}`))
  return res.sendStatus(204)
}
