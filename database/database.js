const Sequelize = require('sequelize')

const connection = new Sequelize('uppon-prod','root','',{
    host:'localhost',
    dialect:'mysql',
    timezone:'-03:00'
});

module.exports = connection;