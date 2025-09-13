import Days, {
  DaysTypeCheck,
} from "../../../../database/models/days.js"

async function findDayById(id) {
  const { error } = DaysTypeCheck.extract("id").validate(id)
  if (error) {
    return { error: error.details[0].message }
  }
  return await Days.findById(id).populate("foods")
}

async function findDayByDate(date) {
  const { error } = DaysTypeCheck.extract("date").validate(date)
  if (error) {
    return { error: error.details[0].message }
  }
  return await Days.findOne({ date }).populate("foods")
}

/*
  to create new day, just call it with any non-valid id.
  for example: nr 1 will always create a new day,
*/
export default async function GetDay(req, res) {
  const id = req.query["day_id"]
  const date = req.query["date"]

  if (!id && !date) {
    return res.status(400).send({
      error: "'day_id' or 'date' were not provided.",
    })
  }

  if (id && date) {
    return res.status(400).send({
      error:
        "both 'day_id' and 'date' were provided. Don't know by which to search",
    })
  }

  try {
    //happy path
    const day = id ? await findDayById(id) : await findDayByDate(date)

    if (!day) {
      return res.status(400).send({ error: `Day doesn't exist` })
    }

    return res.status(201).send({ result: day })
  } catch (err) {
    console.log(err)
    return res
      .status(400)
      .send({ error: `Type validation error: ${err}` })
  }
}
