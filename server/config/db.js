const mongoose = require("mongoose");

const connectDb = async () => {
  try {
    const conn = await mongoose.connect(process.env.MONGO_DB, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    });
    console.log(`mongoDb Connected: ${conn.connection.host}`);
  } catch (error) {
    console.log(error);
    console.log("falhou alguma coisa");
    process.exit();
  }
};

module.exports = connectDb;
