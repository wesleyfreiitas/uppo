const Sequelize = require("sequelize");
const connection = require("../database/database");
const Integration = require("../integration/Integration");

const Execution = connection.define('executions', {
    name: {
        type: Sequelize.STRING,
        allowNull: false
    }, numero: {
        type: Sequelize.STRING,
        allowNull: false
    }, id_workflow: {
        type: Sequelize.STRING,
        allowNull: false
    }, date_and_time: {
        type: Sequelize.STRING,
        allowNull: false
    }, message: {
        type: Sequelize.STRING,
        allowNull: false
    },
});

Integration.hasMany(Execution);
// Execution.belongsTo(Integration);

Execution.sync({ force: false })

module.exports = Execution;