const { sequelize } = require('./models');
const { Portfolio, Share, Trade } = require('./models');

async function initializeDatabase() {
  try {
    await sequelize.authenticate();
    console.log('Connection to the database has been established successfully.');

    const clients = await Portfolio.createBulkClients(5);

    const shares = await Share.createBulkShares();

    await Trade.createBulkTrades(clients, shares);

    console.log('Database initialization completed successfully.');

  } catch (error) {
    console.error('Unable to connect to the database:', error);
  }
}

module.exports = initializeDatabase;
