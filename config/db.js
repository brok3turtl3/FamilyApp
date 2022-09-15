import mongoose from 'mongoose';
import config from 'config';
const db = config.get('MONGO_URI');


//USING ASYNC FUNCTIONS FOR ANYTHING THAT WILL BE RETURNING PROMISES
export const connectDB = async () => {

  try {
    await mongoose.connect(db);
    console.log('MongoDB Connected...');
  } catch (err) {
    console.error(err.message);

    //CAUSES APP EXIT ON ERROR
    process.exit(1);
  }
}


