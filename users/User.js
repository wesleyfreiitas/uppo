const Sequelize = require("sequelize");
const connection = require("../database/database");

const User = connection.define('users', {
    name: {
        type: Sequelize.STRING,
        allowNull: false
    }, email: {
        type: Sequelize.STRING,
        allowNull: false
    }, phone: {
        type: Sequelize.STRING,
        allowNull: false

    }, password: {
        type: Sequelize.STRING,
        allowNull: false
    }, tokenRefresh: {
        type: Sequelize.STRING,
        allowNull: true
    }
})

User.sync({ force: false })

module.exports = User;