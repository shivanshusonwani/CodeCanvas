import express from "express";
import authRoute from "./routes/auth.routes.js";

const app = express();

app.use(express.json());

app.get("/", (req, res) => {
	res.status(200).json({
		message: "server is up and running.",
	});
});

app.use("/api/auth/", authRoute);

export default app;
