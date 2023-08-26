// *
// @uthor Mushahid
// *

const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");
const dotenv = require("dotenv");
const app = express();
const routes = require("./routes/index");
const bodyParser = require("body-parser");
const { loggerUtil } = require('./utils/logger');
// const http = require('http');
// const socketIO = require('socket.io');
// const server = http.createServer(app);
// const io = socketIO(server);
const path=require("path")
// Setting Up App to use data from .env file
dotenv.config();

app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(bodyParser.json());
app.use('/uploads',express.static(path.join(__dirname,'uploads')))
// Routes for the app
const clients = [];
routes(app);

// Loading Environment Variables
const DB_URL = process.env.MONGO_DB_URL;
const PORT = process.env.PORT || 5000;



// Initializing DB connection
mongoose.set("strictQuery", false);
mongoose
  .connect(DB_URL, { useNewUrlParser: true, useUnifiedTopology: true })
  .then(() => {
    app.listen(PORT, () => {
      loggerUtil(`Server running on port: ${PORT}`);
    });
  })
  .catch((error) => {
    loggerUtil(`Error: ${error.message}`);
  });
