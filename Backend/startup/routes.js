const express = require("express");
const config = require("config");
const customers = require("../routes/customers");
const cors = require("cors");

module.exports = function (app) {
  console.log(`Application Name: ${config.get("name")}`);
  console.log(`NODE_ENV : ${config.get("NODE_ENV")}`);
  if (config.get("NODE_ENV") === "development") {
    app.use(cors());
  }
  app.use(express.json());
  app.use("/api/customers", customers);
};
