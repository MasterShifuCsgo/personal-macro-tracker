import { Router } from "express"
import EditDay from "./endpoints/EditDay";

export default function makeDayEndpoints(){
  const router = Router();
  router.get("/get/:day_id", EditDay);
  router.get("/get/:day_id", EditDay);
  return router;
}





