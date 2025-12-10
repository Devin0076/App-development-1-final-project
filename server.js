// Server entry point that starts the Express application

const app = require('./app');

// Set the port from environment variable or default to 3000

const PORT = process.env.PORT || 3000;

// Start the server

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
