const jwt = require("jsonwebtoken");
require("dotenv").config();

const secretKey = process.env.SECRET_KEY;

const verifyJwt = (req, res, next) => {
    const token = req.headers.authorization?.split(" ")[1];

    if (!token) {
        res.status(401).json({ error: "token não fornecido." });
        return;
    }

    jwt.verify(token, secretKey, (err, decoded) => {
        if (err) {
            res.status(401).json({ message: "Token inválido." });
            return;
        }

        req.user = decoded;
        next();
    });
};

module.exports = verifyJwt;
