import createDocument from "../../../../database/functions/createDocument.js";
import getDocument from "../../../../database/functions/getDocument.js";
import Days from "../../../../database/models/days.js";


/*
  to create new day, just call it with any non-valid id.
  for example: nr 1 will always create a new day,
*/
export default async function GetDay(req, res) {
  const id = req.query["day_id"];
  
  if(!id){
    return res
    .status(400)
    .send({ error: "Invalid or missing day_id" });
  }
      
  //get document (or create one) and send it back
  const document = await getDocument(Days, { _id: id });    
  const day = !document ? await createDocument(Days, { date: new Date(), foods: [] }) : document;  
  return res.status(200 + (day ? 0:1)).send({ result: day });
}
