import express from "express";
import cookieParser from "cookie-parser";
import authRoute from "./routes/auth.routes.js";
import canvasRoute from "./routes/canvas.routes.js";

const app = express();

app.use(express.json());
app.use(cookieParser());

app.get("/", (req, res) => {
	res.status(200).json({
		message: "server is up and running.",
	});
});

app.use("/api/auth/", authRoute);
app.use("/api/canvas/", canvasRoute);

export default app;
