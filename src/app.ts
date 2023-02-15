import express from "express";
import cors from "cors";
import { token } from "./token";

const app = express();

app.use(cors());
app.get("/", (req, res) => {
  res.send(token);
});

export default app;
