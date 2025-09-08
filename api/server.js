import express from "express";
const app = express();
const port = 3000;




app.listen(port, () => {
    console.log(`Server is running on http://localhost:${port}`);
}).on("error", (err) => {
    console.error("Failed to start server:", err);
});