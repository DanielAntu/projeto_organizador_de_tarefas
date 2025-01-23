const validationData = (req, res, next) => {
    const { firstName, lastName, username, email, password1, password2 } =
        req.body;

    if (!firstName) {
        res.status(400).json({ error: "O primeiro nome é obrigatório." });
        return;
    }

    if (!lastName) {
        res.status(400).json({ error: "O sobrenome é obrigatório." });
        return;
    }

    if (!username) {
        res.status(400).json({ error: "O nome do usuário é obrigatório." });
        return;
    }

    if (!email) {
        res.status(400).json({ error: "O e-mail é obrigatório." });
        return;
    }

    if (!password1) {
        res.status(400).json({ error: "A senha é obrigatória." });
        return;
    }

    if (!password2) {
        res.status(400).json({
            error: "A confirmação de senha é obrigatória.",
        });
        return;
    }

    if (password1.length < 8) {
        res.status(400).json({
            error: "A senha deve ter no máximo 8 caracteres.",
        });
        return;
    }

    if (password1 !== password2) {
        res.status(400).json({
            error: "As senhas precisam ser iguais.",
        });
        return;
    }

    next();
};

const validationLogin = (req, res, next) => {
    const { identify, password } = req.body;

    if (!identify) {
        res.status(400).json({ error: "O email ou usuario é obrigatório." });
        return;
    }

    if (!password) {
        res.status(400).json({ error: "A senha é obrigatória." });
        return;
    }

    next();
};

const validationEditProfile = (req, res, next) => {
    const { firstName, lastName, username, email, password1, password2 } =
        req.body;

    if (!firstName) {
        res.status(400).json({ error: "O primeiro nome é obrigatório." });
        return;
    }

    if (!lastName) {
        res.status(400).json({ error: "O sobrenome é obrigatório." });
        return;
    }

    if (!username) {
        res.status(400).json({ error: "O nome do usuário é obrigatório." });
        return;
    }

    if (!email) {
        res.status(400).json({ error: "O e-mail é obrigatório." });
        return;
    }

    if (password1) {
        if (password1.length < 8) {
            res.status(400).json({
                error: "A senha deve ter no máximo 8 caracteres.",
            });
            return;
        }

        if (password1 !== password2) {
            res.status(400).json({
                error: "As senhas precisam ser iguais.",
            });
            return;
        }
    }

    next();
};

module.exports = { validationData, validationLogin, validationEditProfile };
