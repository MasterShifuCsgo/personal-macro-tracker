import Days, {
  DaysTypeCheck,
} from "../../../../database/models/days.js"
import mongoose from "mongoose"

/*
  to create new day, just call it with any non-valid id.
  for example: nr 1 will always create a new day,
*/
export default async function GetDay(req, res) {
  const id = req.query["day_id"]

  const { error } = DaysTypeCheck.extract("id").validate(id)
  if (error) {
    return res.status(400).send({ error: error.details[0].message })
  }

  //get document (or create one) and send it back
  const day = await Days.findById(id)
  if (!day) {
    return res
      .status(400)
      .send({ error: `day with id '${id}' doesn't exist` })
  }

  return res.status(200 + (day ? 0 : 1)).send({ result: day })
}
