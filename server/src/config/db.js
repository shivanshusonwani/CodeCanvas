import mongoose from "mongoose";
import config from "./config.js";

const connectDB = async () => {
	try {
		await mongoose.connect(config.db_uri);
		console.log("Database connected.");
	} catch (error) {
		console.log("Database connection failed !!!");
		process.exit(1);
	}
};

export default connectDB;
