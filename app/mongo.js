'use strict';

class MongoConnection {
    constructor() {
        this.configs = require('../configs/mongoConfigs');
        this.MongoClient = require('mongodb').MongoClient;
        this.url = `mongodb://${this.configs.user}:${this.configs.password}@${this.configs.host}/?authMechanism=${this.configs.authMechanism}`;
        this.client = new this.MongoClient(this.url, { useNewUrlParser: true });
    }

    getdbConnection() {
        var self = this;
        return new Promise((resolve, reject) => {
            self.client.connect().then(con => {
                resolve(con.db(self.configs.database));
            }).catch(err => {
                reject(err);
            });
        });
    }
}

exports.MongoConnection = MongoConnection;
