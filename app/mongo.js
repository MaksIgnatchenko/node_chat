const MongoClient = require('mongodb').MongoClient;
const user = encodeURIComponent('user');
const password = encodeURIComponent('password');
const authMechanism = 'DEFAULT';
const dbName = 'chat';
const url = `mongodb://${user}:${password}@mongo_host:27017/?authMechanism=${authMechanism}`;
const client = new MongoClient(url, { useNewUrlParser: true });
    client.connect(function(err, client){
        var db = client.db(dbName);
    });

exports.getResult = function() {
    
}

