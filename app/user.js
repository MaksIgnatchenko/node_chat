'use strict';

const MongoConnection = require('./mongo.js').MongoConnection;

class User extends MongoConnection {
    constructor() {
        super();
        this.collectionName = 'users';
    }

    save(name, password) {
        var self = this;
        this.getdbConnection()
            .then(dbConnection => {
                return new Promise((resolve, reject) => {
                    dbConnection.collection(self.collectionName).insertOne({
                        "name" : name,
                        "password" : password
                    }).then(result => {
                        console.log('success');
                    }).catch(err => {
                        console.log(err.message);
                    });
                });

            })
            .catch(err => {
                console.log(err.message);
            })
    }

    findByName(name) {
        var self = this;
        return new Promise((resolveMain, rejectMain) => {
            this.getdbConnection()
                .then(dbConnection => {
                    return new Promise((resolve, reject) => {
                        dbConnection.collection(self.collectionName).findOne({
                            "name" : name,
                        }).then(result => {
                            resolveMain(result);
                        }).catch(err => {
                            rejectMain(err);
                        });
                    });
                })
                .catch(err => {
                    return new Promise((resolve, reject) => {
                        rejectMain(err);
                    });
                })
        });
    }
}

exports.User = User;
