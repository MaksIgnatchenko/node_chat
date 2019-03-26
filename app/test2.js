const MongoConnection = require('./mongo.js').MongoConnection;

var connection = new MongoConnection();
connection.getdbConnection()
    .then(connection => {
        console.log(connection);
    }).catch(error => {
        console.log(error.message);
    })

