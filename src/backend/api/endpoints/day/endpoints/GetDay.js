import findDayByDate from '../helpers/findDayByDate.js'
import findDayById from '../helpers/findDayById.js'

/*
  to create new day, just call it with any non-valid id.
  for example: nr 1 will always create a new day,
*/
export default async function GetDay(req, res) {
  const id = req.query['day_id']
  const date = req.query['date']

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

    return res.status(200).send({ result: day })
  } catch (err) {    
    return res
      .status(400)
      .send({ error: `Type validation error: ${err}` })
  }
}
