const express = require('express');
const db = require('./config/connection');
const routes = require('./routes');

const PORT = process.env.PORT || 3001;

// Create express app
const app = express();

// Allows app to parse requests with URL-encoded data
app.use(express.urlencoded({ extended: true }));

// Allows app to parse requests to JSOn.
app.use(express.json());

// Allows app to use routes imported from routes folder
app.use(routes);

// Once the database connection is open, the server will start listening on PORT
db.once('open', () => {
  app.listen(PORT, () => {
    console.log(`API server running on port ${PORT}`);
  });
});
