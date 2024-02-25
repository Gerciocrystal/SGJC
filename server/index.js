const express = require("express");
const dotenv = require("dotenv");
const connectDb = require("./config/db");
const routes = require("./routes/index");
const fileupload = require("express-fileupload");
const colors = require("colors");
const path = require("path"); // deployment
dotenv.config();
connectDb();
const app = express();
app.use(express.json());
app.use(fileupload());

app.use("/api", routes);
// ------------------------------------Production---------
const __dirname1 = path.resolve();
console.log(__dirname1);
if (process.env.NODE_ENV === "production") {
  app.use(express.static(path.join(__dirname1, "./dist")));

  app.get("/*", (req, res) => {
    res.sendFile(path.resolve(__dirname1, "dist", "index.html"));
  });
} else {
  app.get("/", (req, res) => {
    res.send("API is running");
  });
}

app.get("/", (req, res) => {
  res.send("The server is running");
});
app.listen(process.env.PORT, () => {
  console.log(`Server is running at http://localhost:${process.env.PORT}`);
});
