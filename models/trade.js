module.exports = (sequelize, DataTypes) => {
    const Trade = sequelize.define('Trade', {
      type: {
        type: DataTypes.ENUM('BUY', 'SELL'),
        allowNull: false
      },
      quantity: {
        type: DataTypes.INTEGER,
        allowNull: false
      },
      price: {
        type: DataTypes.DECIMAL(10, 2),
        allowNull: false
      }
    });
  
    Trade.createBulkTrades = async function (clients, shares) {
      try {
        for (let i = 0; i < clients.length; i++) {
          const client = clients[i];
          const share = shares[i];
          await Trade.create({
            type: 'BUY',
            quantity: 10,
            price: share.price,
            PortfolioId: client.id,
            ShareId: share.id
          });
  
          // Satış işlemi oluşturma
          await Trade.create({
            type: 'SELL',
            quantity: 5,
            price: share.price,
            PortfolioId: client.id,
            ShareId: share.id
          });
        }
        console.log('Bulk insert of trades completed successfully.');
      } catch (error) {
        console.error('Error creating trades:', error);
      }
    };
  
    return Trade;
  };
  