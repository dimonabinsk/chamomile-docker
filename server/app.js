const express = require("express");
const mongoose = require("mongoose");
const chalk = require("chalk");
const fileupload = require("express-fileupload");
const cors = require("cors");
const initDataBase = require("./initDB/initDataBase");
const bodyParser = require("body-parser");
const routes = require("./routes");
const config = require("./config/default.json");
const path = require("path");
const app = express();

app.use(express.static("public"));
app.use(express.json({ limit: "50mb" }));
app.use(express.urlencoded({ extended: false }));
app.use(cors());
app.use(fileupload());
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
// /api
app.use("/api", routes);

// if (process.env.NODE_ENV === "production") {
//   app.use("/", express.static(path.join(__dirname, "client")));

//   const indexPath = path.join(__dirname, "client", "index.html");

//   app.get("*", (req, res) => {
//     res.sendFile(indexPath);
//   });
// }

  app.use("/", express.static(path.join(__dirname, "client")));

  const indexPath = path.join(__dirname, "client", "index.html");

  app.get("*", (req, res) => {
    res.sendFile(indexPath);
  });

async function start() {
  try {
    mongoose.connection.once("open", () => {
      initDataBase();
    });
    await mongoose.connect(config.MONGODB_URI, {
      dbName: config.DB_NAME,
      user: config.DB_USER,
      pass: config.DB_PASS,
    });

    console.log(chalk.green("MongoDB подключен!"));

    app.listen(config.PORT, () => {
      console.log(
        chalk.greenBright(
          `Сервер запущен host: http://localhost:${config.PORT}/`
        )
      );
    });
  } catch (error) {
    console.log(chalk.red(error.message));
    process.exit(1);
  }
}

start();
