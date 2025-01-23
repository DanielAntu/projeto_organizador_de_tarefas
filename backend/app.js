require("dotenv").config();
const express = require("express");
const sequelize = require("./config/database");
const cors = require("cors");

const app = express();
app.use(express.json());
app.use(cors());

const port = process.env.PORT || 3000;

const router = require("./routers/router");
app.use("/api", router);

sequelize
    .sync()
    .then(() => {
        console.log("Banco de dados sincronizado");
        app.listen(port, () => console.log(`App rodando na porta ${port}`));
    })
    .catch((err) => console.log("Erro ao sincronizar banco de dados."));
