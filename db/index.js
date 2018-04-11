const mongoose = require('mongoose');
mongoose.connect('mongodb://localhost/embeddit');

var db = mongoose.connection;

db.on('error', console.error.bind(console, 'db connection error:'));

module.exports = db;