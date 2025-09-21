import { DaysTypeCheck } from '../../../../database/models/days.js'
import findDayByDate from '../helpers/findDayByDate.js'
import findDayById from '../helpers/findDayById.js'

/*
only need to send date or date_id for referencing the specific day.
needs foods array which only has Food Mongoose object Id in them, hex 24 strings.
*/

export default async function EditDay(req, res) {
  const id = req.query['day_id']
  const date = req.query['date']
  const newFoods = req.body['foods']  

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

  const { error } = DaysTypeCheck.validate({ id: id, foods: newFoods })

  if (error) {
    return res.status(400).send({ error: error.details[0].message })
  }

  //find day  
  const document = date ? await findDayByDate(date) : await findDayById(id);

  if (!document) {
    return res.status(400).send({
      error: `day with '${id}' does not exist`,
    })
  }

  document.foods = newFoods
  try {
    await document.save()
  } catch (err) {
    console.log(err);
    return res.status(400).send({
      error: 'array has food id/s that do not exist on the database.',
    })
  }

  return res.sendStatus(204)
}
