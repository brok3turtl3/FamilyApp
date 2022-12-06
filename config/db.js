import mongoose from 'mongoose';
import config from 'config';

import dotenv from 'dotenv';

dotenv.config();

//USING ASYNC FUNCTIONS FOR ANYTHING THAT WILL BE RETURNING PROMISES
export const connectDB = async () => {
	try {
		await mongoose.connect(process.env.MONGO_URI);
		console.log('MongoDB Connected...');
	} catch (err) {
		console.error(err.message);

		//CAUSES APP EXIT ON ERROR
		process.exit(1);
	}
};
