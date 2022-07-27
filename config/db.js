const mongoose = require('mongoose');
const config = require('config');
const db = config.get('MONGO_URI');


//USING ASYNC FUNCTIONS FOR ANYTHING THAT WILL BE RETURNING PROMISES
const connectDB = async () => {

  try {
    await mongoose.connect(db);
    console.log('MongoDB Connected...');
  } catch (err) {
    console.error(err.message);

    //CAUSES APP EXIT ON ERROR
    process.exit(1);
  }
}

module.exports = connectDB;
