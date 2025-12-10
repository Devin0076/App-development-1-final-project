// Sequelize database configuration for SQLite for local development

const { Sequelize } = require('sequelize');

// Create SQLite database connection
const sequelize = new Sequelize({
  dialect: 'sqlite',
  storage: './database.sqlite',
  logging: false,
});

// Script for syncing the database models when running `npm run db:sync`
const initDb = async () => {
  try {
    // Verify connection
    await sequelize.authenticate();
    console.log('Database connected');
    // Intialize models and their relationships

    const models = require('../models')(sequelize);

    // Sync models to the database
    await sequelize.sync({ force: true });
    console.log('Models synced');
  } catch (err) {
    console.error('Database error:', err.message);
  } finally {
    // Close the connection
    process.exit(); 
  }
};

// When this file is run dircectly, run initDb
if (require.main === module) {
  initDb();
}

module.exports = sequelize;
