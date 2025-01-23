const { Op } = require("sequelize");

const getUser = async (User, id) => {
    const user = await User.findByPk(id, {
        attributes: { exclude: ["password"] },
    });

    return user;
};

const getProject = async (Project, id, user) => {
    const project = await Project.findOne({
        where: {
            [Op.and]: [{ id }, { userId: user.id }],
        },
    });

    return project;
};

module.exports = { getUser, getProject };
