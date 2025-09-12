import Foods, {
  FoodsTypeCheck,
} from "../../../../database/models/foods.js"

export default async function EditFood(req, res) {
  const id = req.query["food_id"]
  const newFood = req.body["food"]

  const { err1 } = FoodsTypeCheck.extract("id").validate(id)
  if(err1){return res.status(400).send({error: err1.details[0].message})}
  
  const { err2 } = FoodsTypeCheck.extract("food").validate(newFood)
  if(err2){return res.status(400).send({error: err2.details[0].message})}

  //check if food exists
  const document = Foods.findById(id)
  if (!document) {
    return res
      .status(400)
      .send({ error: "provided id does not match an existing food id" })
  }

  //yes, change to new Food
  await document
    .findByIdAndUpdate(id, { $set: newFood })
    .then(() => console.log(`updated food '${newFood.name}'`))
    .catch((err) => console.log(err))
  return res.sendStatus(204)
}
