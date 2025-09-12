import { Router } from "express"
import CreateFood from "./endpoints/CreateFood.js"
import DeleteFood from "./endpoints/DeleteFood.js"
import EditFood from "./endpoints/EditFood.js"
import GetAllFoods from "./endpoints/GetAllFoods.js"

export default function makeFoodEndpoints() {
  const router = Router()
  router.post("/", CreateFood)
  router.delete("/", DeleteFood)
  router.put("/", EditFood)
  router.get("/", GetAllFoods)
  // more ...
  return router
}
