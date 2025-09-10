import getDocument from "../../../../database/functions/getDocument.js";
import Days from "../../../../database/models/days.js";

export default async function EditDay(req, res) {
  
  const id = req.query['day_id'];
  const newFoods = req.body["foods"]; 
  
  if(!Array.isArray(newFoods)){
    return res.status(400).send({error: "new foods are not formatted in to a list"});
  }

  const document = await Days.findById(id);
  if(!document){
    return res.status(400).send({error: `day with '${id}' does not exist`});
  }

  document.foods = newFoods;  
  try{
    await document.save();
  }catch(err){
    return res.status(400).send({error: "array has food id/s that do not exist on the database."});
  }
  
  return res.status(204).send();
}
