import dotenv from "dotenv";
dotenv.config();
import cookieParser from "cookie-parser";
import express, { type Request, type Response } from "express";
import cors from "cors";
import authRoutes from "./routes/authRoutes";
import userRoutes from "./routes/userRoutes";
import bookRoutes from "./routes/bookRoutes";

const app = express();
const PORT = 3000;

// uses express to parse incoming requests
// and allows cross-origin requests from the front-end
// also parses cookies from incoming requests
// credentials are set to true to allow cookies to be sent
app.use(
	express.json(),
	cors({
		origin: "http://localhost:5173",
		credentials: true,
	}),
	cookieParser()
);

// REQUESTS
app.use("/users", userRoutes);
app.use("/books", bookRoutes);
app.use("/api/auth", authRoutes);

// localhost:3000 home page
app.get("/", (req: Request, res: Response) => {
	res.json({ message: "HOME PAGE", url: req.url });
});


// to verify that the server started
app.listen(PORT, () => {
  console.log("Server started and listening on port", PORT);
});
