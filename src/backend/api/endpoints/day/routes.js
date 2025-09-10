import { Router } from "express";
import EditDay from "./endpoints/EditDay.js";
import GetDay from "./endpoints/GetDay.js";

export default function makeDayEndpoints() {
  const router = Router();
  router.put("/", EditDay);
  router.get("/", GetDay);
  return router;
}
