const Sequelize = require("sequelize");
const connection = require("../database/database");

const Message = connection.define('mensagens', {
    message: {
        type: Sequelize.STRING,
        allowNull: false
    } 
});

Message.sync({ force: false })

module.exports = Message;