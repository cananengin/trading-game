require('dotenv').config();
const Sequelize = require('sequelize');

const sequelize = new Sequelize(
    process.env.DB_DATABASE,
    process.env.DB_USERNAME,
    process.env.DB_PASSWORD, {
    host: process.env.DB_HOST,
    dialect: process.env.DB_DIALECT,
  });

const db = {};
db.Sequelize = Sequelize;
db.sequelize = sequelize;

db.Portfolio = require('./portfolio')(sequelize, Sequelize);
db.Share = require('./share')(sequelize, Sequelize);
db.Trade = require('./trade')(sequelize, Sequelize);

db.Portfolio.hasMany(db.Trade);
db.Trade.belongsTo(db.Portfolio);

db.Share.hasMany(db.Trade);
db.Trade.belongsTo(db.Share);

module.exports = db;
