const mongoose = require('mongoose');


const MONGO_URI= "mongodb+srv://rounak8287:raunak123@cluster0.ozkx8.mongodb.net/to-do"
const connectDB = async () => {
  try {
    await mongoose.connect(MONGO_URI, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    });
    console.log('MongoDB connected');
  } catch (error) {
    console.error('MongoDB connection failed:', error.message);
    process.exit(1);
  }
};

module.exports = connectDB;
