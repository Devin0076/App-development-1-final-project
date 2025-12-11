// Main application file that sets up middleware, routes, and database models.

require('dotenv').config();


const express = require('express');
const sequelize = require('./config/database');
const initModels = require('./models');
const logger = require('./middleware/logger');
const errorHandler = require('./middleware/errorHandler');

// Create Express app and initialize models
const app = express();
const models = initModels(sequelize);

// Parse incoming JSON requests 
app.use(express.json());

// Custom request logger middleware
app.use(logger);

// Attach models to request object so they can be accessed in routes
app.use((req, res, next) => {
  req.models = models;
  next();
});

// Simple health check/ root route
app.get('/', (req, res) => {
  res.json({ message: "Pit / Dark Pit Matchup API MVP" });
});

// Routes
app.use('/auth', require('./routes/auth'));


app.use('/characters', require('./routes/characters'));
app.use('/ban-stages', require('./routes/banstages'));
app.use('/counterpick-stages', require('./routes/counterpickStages'));
app.use('/tips', require('./routes/tips'));

// Global error handling middleware

app.use(errorHandler);

module.exports = app;
