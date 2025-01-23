const { DataTypes } = require("sequelize");
const sequelize = require("../config/database");
const User = require("./User");

const Project = sequelize.define("Project", {
    name: {
        type: DataTypes.STRING,
        allowNull: false,
    },
    todos: {
        type: DataTypes.JSON,
        allowNull: false,
    },
});

User.hasMany(Project, { foreignKey: "userId", onDelete: "CASCADE" });
Project.belongsTo(User, { foreignKey: "userId" });

module.exports = Project;
