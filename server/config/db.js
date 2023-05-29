const mongoose = require("mongoose");

const connectDb = async () => {
  try {
    const conn = await mongoose.connect("mongodb://127.0.0.1:27017/SGJC", {
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
