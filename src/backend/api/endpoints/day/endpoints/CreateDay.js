import Days from "../../../../database/models/days.js"
import getToday from "../../../../../global/helpers/getToday.js"

export default async function CreateDay(req, res) {
  const document = await Days.findOne({ date: getToday() })  
  if (document) {
    return res
      .status(400)
      .send({ error: "Day already with today's date already exists" })
  }

  const day = await Days.create({ date: getToday(), foods: [] }).catch(
    (err) => {
      console.log(err)
      return res
        .status(500)
        .send({ error: `Database couldn't write new day` })
    }
  )
  return res.status(201).send({ result: day })
}
