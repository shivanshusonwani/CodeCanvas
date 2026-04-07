import express from "express";
import cookieParser from "cookie-parser";
import cors from "cors";
import authRoute from "./routes/auth.routes.js";
import canvasRoute from "./routes/canvas.routes.js";
import config from "./config/config.js";

const app = express();

app.use(express.json());
app.use(cookieParser());
app.use(
	cors({
		origin: config.frontend_url || "http://localhost:5173",
		credentials: true,
	}),
);

app.get("/", (req, res) => {
	res.status(200).json({
		message: "server is up and running.",
	});
});

app.use("/api/auth/", authRoute);
app.use("/api/canvas/", canvasRoute);

export default app;
