module.exports = (sequelize, DataTypes) => {
    const Share = sequelize.define('Share', {
      symbol: {
        type: DataTypes.STRING,
        allowNull: false,
        unique: true
      },
      price: {
        type: DataTypes.DECIMAL(10, 2),
        allowNull: false,
        defaultValue: 0.00
      }
    });
  
    Share.createBulkShares = async function () {
      try {
        const symbols = ['ABC', 'DEF', 'GHI', 'JKL', 'MNO'];
        const shares = [];
        for (let symbol of symbols) {
          const [share, created] = await Share.findOrCreate({ where: { symbol }, defaults: { price: 100.00 } });
          shares.push(share);
        }
        return shares;
      } catch (error) {
        console.error('Error creating shares:', error);
      }
    };
  
    return Share;
  };
  