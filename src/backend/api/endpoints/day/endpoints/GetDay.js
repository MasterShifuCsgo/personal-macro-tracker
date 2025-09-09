import getDocument from "../../../../database/functions/getDocument.js";
import Days from "../../../../database/models/days.js";

export default function GetDay(req, res){
  
  const id = req.params.day_id;

  // document exists?
  const day = getDocument(Days, {_id: id});
  if(day != {}){
    return res.status(409).send({error: "Document already exists", result: null});
  }

  //create the day. must create helper function
    //send error.


  //send the day along with id.



}




