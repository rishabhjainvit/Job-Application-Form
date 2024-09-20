const mongoose = require('mongoose');

const uri = "mongodb+srv://rishabhcool7201:ECnFJ6PScFIS5eMl@cluster0.3azwn.mongodb.net/sample-db?retryWrites=true&w=majority";

const connectDB = async () => {
  try {
    await mongoose.connect(process.env.MONGO_URI, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    });
    console.log('MongoDB connected...');
  } catch (err) {
    console.error('Database connection error:', err.message);
    process.exit(1);
  }
};
