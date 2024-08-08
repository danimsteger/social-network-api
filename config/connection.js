const { connect, connection } = require('mongoose');

// Establish location and name of MongoDB database to connect to
const connectionString = 'mongodb://127.0.0.1:27017/usersDB';

// Initializes connection to MongoDB
connect(connectionString);

module.exports = connection;
