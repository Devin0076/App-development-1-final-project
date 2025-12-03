const { Sequelize } = require('sequelize');

// Create SQLite database connection
const sequelize = new Sequelize({
  dialect: 'sqlite',
  storage: './database.sqlite',
  logging: false,
});

const initDb = async () => {
  try {
    await sequelize.authenticate();
    console.log('Database connected');

    const models = require('../models')(sequelize);

    await sequelize.sync({ force: true });
    console.log('Models synced');
  } catch (err) {
    console.error('Database error:', err.message);
  } finally {
    process.exit(); 
  }
};

// If this file is run directly (npm run db:sync)
if (require.main === module) {
  initDb();
}

module.exports = sequelize;
