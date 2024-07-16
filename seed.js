const { Portfolio, Share, sequelize } = require('./models');

const seedDatabase = async () => {
  await sequelize.sync({ force: true });

  const portfolio1 = await Portfolio.create({ name: 'User1 Portfolio' });
  const portfolio2 = await Portfolio.create({ name: 'User2 Portfolio' });

  const share1 = await Share.create({ symbol: 'ABC', price: 100.00 });
  const share2 = await Share.create({ symbol: 'XYZ', price: 200.00 });

  console.log('Database seeded!');
};

seedDatabase().then(() => {
  console.log('Seeding completed.');
  process.exit();
}).catch((error) => {
  console.error('Seeding failed:', error);
  process.exit(1);
});
