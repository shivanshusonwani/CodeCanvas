import jwt from "jsonwebtoken";
import User from "../models/user.model.js";
import config from "../config/config.js";

export const authMiddleware = (req, res, next) => {
	const token = req.cookies.access_token;

	if (!token) {
		return res.status(401).json({
			message: "Unauthorized",
		});
	}

	const verified = jwt.verify(token, config.jwt_secret);
	req.user = verified;

	next();
};
