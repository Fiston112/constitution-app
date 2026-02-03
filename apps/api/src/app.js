const express = require("express");
const cors = require("cors");
const helmet = require("helmet");

const routes = require("./routes");

const app = express();

app.use(helmet());
app.use(cors());
app.use(express.json());

// Routes
app.use("/api/v1", routes);

// 404
app.use((req, res) => {
  res.status(404).json({ message: "Route not found" });
});

module.exports = app;
