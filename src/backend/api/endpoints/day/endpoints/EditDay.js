import Days, {
  DaysTypeCheck,
} from "../../../../database/models/days.js"

export default async function EditDay(req, res) {
  const id = req.query["day_id"]
  const newFoods = req.body["foods"]

  const { error } = DaysTypeCheck.validate({ id: id, foods: newFoods })

  if(error) {
    return res.status(400).send({ error: error.details[0].message })
  }

  const document = await Days.findById(id)
  if (!document) {
    return res.status(400).send({
      error: `day with '${id}' does not exist`,
    })
  }

  document.foods = newFoods
  try {
    await document.save()
  } catch (err) {
    return res.status(400).send({
      error: "array has food id/s that do not exist on the database.",
    })
  }

  return res.sendStatus(204)
}
