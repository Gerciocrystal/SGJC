const express = require("express");
const dotenv = require("dotenv");
const connectDb = require("./config/db");
const routes = require("./routes/index");
const fileupload = require("express-fileupload");
connectDb();
dotenv.config();
const app = express();
app.use(express.json());
app.use(fileupload());

app.use("/api", routes);
app.get("/", (req, res) => {
  res.send("The server is running");
});
app.listen(process.env.PORT, () => {
  console.log(`Server is running at http://localhost:${process.env.PORT}`);
});
