const User = require("../models/User");
const bcrypt = require("bcryptjs");
const { Op } = require("sequelize");
const jwt = require("jsonwebtoken");
require("dotenv").config();
const { getUser } = require("../utils/getDateDb");

const secretKey = process.env.SECRET_KEY;

const register = async (req, res) => {
    try {
        const { firstName, lastName, username, email, password1, password2 } =
            req.body;

        const userEmail = await User.findOne({ where: { email } });

        if (userEmail) {
            res.status(400).json({ error: "Usuário já cadastrado." });
            return;
        }

        const userName = await User.findOne({ where: { username } });

        if (userName) {
            res.status(400).json({ error: "Usuário já cadastrado." });
            return;
        }

        const salt = await bcrypt.genSalt(12);
        const passwordHash = await bcrypt.hash(password1, salt);

        const obj = {
            firstName,
            lastName,
            username,
            email,
            password: passwordHash,
        };

        await User.create(obj);

        res.status(201).json({ message: "Usuário criado com sucesso." });
    } catch (error) {
        console.log(error);
        res.status(500).json({
            error: "Ocorreu um erro no sistema. tente mais tarde",
        });
    }
};

const login = async (req, res) => {
    try {
        const { identify, password } = req.body;

        const user = await User.findOne({
            where: {
                [Op.or]: [{ email: identify }, { username: identify }],
            },
        });

        if (!user) {
            res.status(404).json({ error: "Usuário não encontrado." });
            return;
        }

        passwordChecked = await bcrypt.compare(password, user.password);

        if (!passwordChecked) {
            res.status(400).json({ error: "Senha não confere." });
            return;
        }

        const token = jwt.sign({ id: user.id }, secretKey, {
            expiresIn: "24h",
        });

        res.status(200).json({ token, message: "Usuário logado com sucesso." });
    } catch (error) {
        console.log(error);
        res.status(500).json({
            error: "Ocorreu um erro no sistema. tente mais tarde",
        });
    }
};

const profile = async (req, res) => {
    const userId = req.user.id;

    try {
        const user = await getUser(User, userId);

        if (!user) {
            res.status(404).json({ error: "Usuário não encontrado." });
            return;
        }

        res.status(200).json(user);
    } catch (error) {
        console.log(error);
        res.status(500).json({
            error: "Ocorreu um erro no sistema. tente mais tarde",
        });
    }
};

const editProfile = async (req, res) => {
    const userId = req.user.id;
    const { firstName, lastName, username, email, password1, password2 } =
        req.body;

    try {
        const user = await getUser(User, userId);

        if (!user) {
            res.status(404).json({ error: "Usuário não encontrado." });
            return;
        }

        const obj = {
            firstName,
            lastName,
            username,
            email,
        };

        if (password1) {
            const salt = await bcrypt.genSalt(12);
            const passwordHash = await bcrypt.hash(password1, salt);
            obj.password = passwordHash;
        }

        await user.update(obj);

        res.status(200).json({ message: "Usuário atualizado com sucesso." });
    } catch (error) {
        console.log(error);
        res.status(500).json({
            error: "Ocorreu um erro no sistema. tente mais tarde",
        });
    }
};

module.exports = { register, login, profile, editProfile };
