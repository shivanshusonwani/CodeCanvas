import config from "../config/config.js";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";

import User from "../models/user.model.js";

export const signup = async (req, res) => {
	try {
		const { name, email, password } = req.body;

		if (!name || !email || !password) {
			return res.status(400).json({ message: "All fields are required" });
		}

		const existingUser = await User.findOne({ email });
		if (existingUser) {
			return res.status(400).json({
				message: "User already exists",
			});
		}

		const salt = await bcrypt.genSalt(10);
		const hashedPassword = await bcrypt.hash(password, salt);

		const user = await User.create({
			name,
			email,
			password: hashedPassword,
		});

		res.status(201).json({
			message: "User registered successfully",
			user,
		});
	} catch (error) {
		console.error("Signup Error:", error);
		res.status(500).json({ message: error.message || "Signup failed" });
	}
};

export const login = async (req, res) => {
	try {
		const { email, password } = req.body;

		if (!email) {
			return res.status(400).json({
				message: "Email is required",
			});
		} else if (!password) {
			return res.status(400).json({
				message: "Password is required",
			});
		}

		const user = await User.findOne({ email }).select("+password");
		if (!user) {
			return res.status(401).json({
				message: "Invalid credentials",
			});
		}

		const isPasswordValid = await bcrypt.compare(password, user.password);
		if (!isPasswordValid) {
			return res.status(401).json({
				message: "Invalid credentials",
			});
		}

		const token = jwt.sign(
			{
				id: user._id,
			},
			config.jwt_secret,
			{ expiresIn: "1d" },
		);

		res.cookie("access_token", token, {
			httpOnly: true,
			secure: false,
			sameSite: "lax",
			maxAge: 1000 * 60 * 60 * 24,
		});

		return res.status(200).json({
			message: "Login successful",
			user,
		});
	} catch (error) {
		return res.status(500).json({
			message: "Login failed",
		});
	}
};

export const getMe = async (req, res) => {
	try {
		const user = await User.findById(req.user.id).select("-password");

		if (!user) {
			return res.status(404).json({
				message: "User not found",
			});
		}

		return res.status(200).json({
			message: "User profile fetched successfully",
			user,
		});
	} catch (error) {
		return res.status(500).json({ message: "Failed to fetch profile" });
	}
};

export const logOut = async (req, res) => {
	try {
		res.clearCookie("access_token");

		return res.status(200).json({
			message: "Logged out successfully",
		});
	} catch (error) {
		return res.status(500).json({
			message: "Something went wrong",
		});
	}
};
