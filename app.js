const express = require("express");
const cors = require("cors");
const clienteRoute = require("./src/routes/clienteRoute");
const equipamentoRoute = require("./src/routes/equipamentoRoute");
const tecnicoRoute = require("./src/routes/tecnicoRoute");
const precoRoute = require("./src/routes/precoRoute");
const ordemRoute = require("./src/routes/ordemRoute");
const app = express();

app.use(cors());
app.use(express.json());
app.use("/api", clienteRoute);
app.use("/api", equipamentoRoute);
app.use("/api", tecnicoRoute);
app.use("/api", precoRoute);
app.use("/api", ordemRoute);

module.exports = app;
