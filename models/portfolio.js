module.exports = (sequelize, DataTypes) => {
    const Portfolio = sequelize.define('Portfolio', {
      name: {
        type: DataTypes.STRING,
        allowNull: false
      }
    });
  
    Portfolio.createBulkClients = async function (numClients) {
      try {
        const clients = [];
        for (let i = 1; i <= numClients; i++) {
          const client = await Portfolio.create({ name: `Client ${i}` });
          clients.push(client);
        }
        return clients;
      } catch (error) {
        console.error('Error creating clients:', error);
      }
    };
  
    return Portfolio;
  };
  
  