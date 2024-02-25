const mongoose = require("mongoose");

const connectDb = async () => {
  try {
    const conn = await mongoose.connect(
      process.env.NODE_ENV == "production"
        ? process.env.MONGO_URL_PRO
        : process.env.MONGO_URL,
      {
        useNewUrlParser: true,
        useUnifiedTopology: true,
      }
    );
    console.log(`mongoDb Connected: ${conn.connection.host}`.cyan.underline);
  } catch (error) {
    console.log(`mongoDb erro: ${error.message}`.red.bold);
    process.exit();
  }
};

module.exports = connectDb;
