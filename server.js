const app = require('./app');
const sequelize = require('./config/database');
const initModels = require('./models');

const PORT = process.env.PORT || 3000;

(async () => {
  try {
    // Initialize models and relationships
    initModels(sequelize);

    // Sync database 
    await sequelize.sync();

    console.log('Database synced');

    app.listen(PORT, () => {
      console.log(`Server running on port ${PORT}`);
    });
  } catch (err) {
    console.error('Failed to start server:', err);
    process.exit(1);
  }
})();
