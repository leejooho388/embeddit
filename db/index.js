const mongoose = require('mongoose');
mongoose.connect(process.env.MONGODB || 'mongodb://localhost/embeddit', { useNewUrlParser: true, useUnifiedTopology: true  });

var db = mongoose.connection;

db.on('error', console.error.bind(console, 'db connection error:'));

module.exports = db;