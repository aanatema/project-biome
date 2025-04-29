import dotenv from "dotenv";
dotenv.config();

import express, { type Request, type Response } from "express";
import cors from "cors";
import userRoutes from "./routes/userRoutes";
import bookRoutes from "./routes/bookRoutes";

const app = express();
const PORT = 3000;

app.use(
  express.json(),
  cors({
    origin: "http://localhost:5173",
  })
);

// REQUESTS
app.use("/users", userRoutes);
app.use("/books", bookRoutes);

// localhost:3000 home page
app.get("/", (req: Request, res: Response) => {
  res.send("HOME PAGE");
  res.json({ content: "this is some content", url: req.url });
});

// delete the book, WIP
app.delete(
  "/delete/isbn/:isbn/reviews/:reviewId",
  (req: Request, res: Response) => {
    res.end();
  }
);

// to verify that the server started
app.listen(PORT, () => {
  console.log("Server started and listening on port", PORT);
});
