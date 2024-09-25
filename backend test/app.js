const express = require("express");
const swaggerUi = require("swagger-ui-express");
const router = require("./router");
const swaggerSpec = require("./swagger/swaggerConfig");

const app = express();

app.use(express.urlencoded({ extended: true }));

app.use("/api-docs/", swaggerUi.serve, swaggerUi.setup(swaggerSpec));

app.use(express.json());

app.use("/api", router);

const port = process.env.PORT || 3000;

module.exports = app;
