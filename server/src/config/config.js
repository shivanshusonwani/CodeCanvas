import "dotenv/config";

const config = {
	port: process.env.PORT,
	db_uri: process.env.MONGODB_URI,
	jwt_secret: process.env.JWT_SECRET,
	frontend_url: process.env.FRONTEND_URL,
};

export default Object.freeze(config);
