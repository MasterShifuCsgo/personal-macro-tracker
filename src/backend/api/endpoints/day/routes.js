import { Router } from "express";
import EditDay from "./endpoints/EditDay.js";
import GetDay from "./endpoints/GetDay.js";

export default function makeDayEndpoints() {
  const router = Router();
  router.post("/edit/:day_id", EditDay);
  router.get("/", GetDay);
  return router;
}
