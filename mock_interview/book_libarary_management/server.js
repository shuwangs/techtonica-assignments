import express from "express";
import bookRoute from "./routes/bookRoute.js";

const PORT = 3000;
const app = express();

app.use(express.json());

app.use("/api/books", bookRoute);

export default app;