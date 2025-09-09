import getDocument from "../../../../database/functions/getDocument.js";
import Days from "../../../../database/models/days.js";

export default function EditDay(req, res){

  const id = req.params.day_id;


// document exists?
  const day = getDocument(Days, {_id: id});
  

}




