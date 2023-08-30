const Sequelize = require("sequelize");
const connection = require("../database/database");

const Integration = connection.define('integrations', {
    name: {
        type: Sequelize.STRING,
        allowNull: false
    }, execution: {
        type: Sequelize.STRING,
        allowNull: false
    }, descricao: {
        type: Sequelize.STRING,
        allowNull: false
    }, json: {
        type: Sequelize.STRING,
        allowNull: false
    }
})

Integration.sync({ force: false })

module.exports = Integration;