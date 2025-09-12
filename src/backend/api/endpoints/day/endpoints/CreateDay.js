import Days from "../../../../database/models/days.js"

export default async function CreateDay(req, res) {
  const day = await Days.create({ date: new Date(), foods: [] }).catch(
    (err) => console.log(err)
  )
  return res.status(201).send({ result: day })
}
