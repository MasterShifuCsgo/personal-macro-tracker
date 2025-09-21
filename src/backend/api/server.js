import "../../../env.js" // importing .env
import express from "express"
import cors from "cors"
import { connectDB } from "../database/index.js"
import mongoose from "mongoose"
import makeDayEndpoints from "./endpoints/day/routes.js"
import makeFoodEndpoints from "./endpoints/food/routes.js"

const app = express()
const port = process.env.PORT

const corsOptions = {
  origin: ["http://localhost:5173"],
  methods: ["GET", "POST", "PUT", "DELETE"],
}

let server
let isShuttingDown = false
async function shutdown(code = 0) {
  if (isShuttingDown) return
  isShuttingDown = true

  const stopServer = new Promise((res) => {
    if (!server) return res(null) // return when server doesn't exist
    server.close(() => res(null))
  })

  const closeDB = mongoose.connection.close().catch(() => {
    console.log("DB close Failed:", err)
  })

  try {
    // race between which one returns first
    await Promise.race([
      Promise.allSettled([stopServer, closeDB]),
      Promise(() => {
        setTimeout(() => {
          console.log("\nTimeout 10s\n")
        }, 10_000)
      }),
    ])
  } catch (e) {
    console.log(String(e))
  } finally {
    process.exit(code)
  }
}

//maybe program more event handlers for logging?
process.on("SIGINT", () => {
  shutdown(0)
}) // on CTRL+C
process.on("SIGTERM", () => {
  shutdown(0)
}) // when Termination signal is emitted




// ----Middleware----
app.use(cors(corsOptions))
app.use(express.json())

app.use((req, res, next) => {

  const oldRes = res.send;

  res.send = function (data) {
    console.log("-------- REQUEST --------");
    console.log("Endpoint:", req.originalUrl);  // full URL path
    console.log("Method:", req.method);        // GET, POST, etc.
    console.log("Request body:", req.body);
    console.log("Response:", data);
    console.log("-------- REQUEST --------");
    oldRes.call(this, data);
  }

  next()
})



// ----Routes----
app.use("/day", makeDayEndpoints())
app.use("/food", makeFoodEndpoints())

connectDB()
  .then(() => {
    server = app
      .listen(port, () => {
        console.log(`Server is running on http://localhost:${port}`)
      })
      .on("error", (err) => {
        console.error("Failed to start server:", err)
      })
  })
  .catch((err) => {
    console.log(err)
  })
