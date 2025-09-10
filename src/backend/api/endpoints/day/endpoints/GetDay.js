import createDocument from "../../../../database/functions/createDocument.js";
import getDocument from "../../../../database/functions/getDocument.js";
import Days from "../../../../database/models/days.js";

export default async function GetDay(req, res) {
  const id = req.query["day_id"];

  if (!id) {
    return res
      .status(400)
      .send({ error: "Invalid or missing day_id", result: null });
  }

  // document exists?
  let day = await getDocument(Days, { _id: id }).catch((err) => {
    return res.status(500).send({ error: err, result: null });
  });

  if (!day) {
    //create day
    day = await createDocument(Days, { date: new Date(), foods: [] }).catch(
      (err) => {
        return res.status(500).send({ error: err, result: null });
      }
    );
    return res.status(201).send({ error: null, result: day });
  }

  return res.status(200).send({ error: null, result: day });
}
