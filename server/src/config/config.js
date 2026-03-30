import "dotenv/config";

const config = {
	port: process.env.PORT,
	db_uri: process.env.MONGODB_URI,
};

export default Object.freeze(config);
