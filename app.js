const express = require('express');
const sequelize = require('./config/database');
const initModels = require('./models');
const logger = require('./middleware/logger');
const errorHandler = require('./middleware/errorHandler');

// Create Express app
const app = express();
const models = initModels(sequelize);

// Middleware
app.use(express.json());
app.use(logger);

// Attach models to request object
app.use((req, res, next) => {
  req.models = models;
  next();
});

// Root route
app.get('/', (req, res) => {
  res.json({ message: "Pit / Dark Pit Matchup API MVP" });
});

// Routes
app.use('/characters', require('./routes/characters'));
app.use('/ban-stages', require('./routes/banstages'));
app.use('/counterpick-stages', require('./routes/counterpickStages'));
// Other routes will be added later:
// app.use('/tips', ...)

app.use(errorHandler);

module.exports = app;
