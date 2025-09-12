import Days from "../../../../database/models/days.js";
import Foods from "../../../../database/models/foods.js";


export default async function GetAllFoods(req, res) {
  
  const foods = await Foods.find();
  if(!foods){
    return res.status(400).send({error: `No foods exist`})
  }

  //return all foods
  return res.status(200).send({ result: foods });
}
