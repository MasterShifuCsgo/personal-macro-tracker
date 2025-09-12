import { Router } from "express"
import EditDay from "./endpoints/EditDay.js"
import GetDay from "./endpoints/GetDay.js"
import CreateDay from "./endpoints/CreateDay.js"

export default function makeDayEndpoints() {
  const router = Router()
  router.put("/", EditDay)
  router.get("/", GetDay)
  router.post("/", CreateDay)
  return router
}
