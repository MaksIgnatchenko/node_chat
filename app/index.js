var app = require('http').createServer(handler)
var io = require('socket.io')(app);
var fs = require('fs'),
    crypto = require('crypto'),
    cookie = require('cookie'),
    url = require('url'),
    querystring = require('querystring');
    // dbConnection = require('./mongo.js');



app.listen(8080);

// var db = dbConnection.getDbConnection();
//
// function test() {
//     setTimeout(() => console.log(db), 5000);
// };
//
// test();

console.log(require('./mongo.js').getDb);


// console.log(require('./mongo.js').getDbConnection(function(data) {
//     console.log(data);
// }));

function handler (req, res) {
    if (req.url == '/postLogin' && req.method == 'POST') {
        let body = '';
        req.on('data', function(chunk) {
             body += chunk.toString();
        });
        req.on('end', function() {
            let post = querystring.parse(body);
            let getUsers = function(db, callback) {
                let collection = db.collection('users');
                collection.find({}).toArray(function(err, docs) {
                    callback(docs);
                })
            }
            getUsers(dbConnection, function(data) {
                console.log(data);
            });
            res.statusCode = 200;
            return res.end('name ' + post.username);
        });
        // var query = url.parse(req.url, true, true).query;
        // res.writeHead(302, {
        //     'Location': '/index'
        // });
        // res.end();
    } else {
        loadFile(req.url, req, res);
    }
}

function loadFile(path, req, res) {
    fs.readFile(__dirname + '/../public/html/' + path + '.html',
        function (err, data) {
            if (err) {
                res.writeHead(500);
                return res.end('Something went wrong');
            }
            res.writeHead(200);
            res.end(data);
        });
}

function getUserName() {
    return crypto.randomBytes(5).toString('hex');
}

// io.set('authorization', function (handshakeData, accept) {
//     if (handshakeData.headers.cookie) {
//
//         handshakeData.cookie = cookie.parse(handshakeData.headers.cookie);
//
//         handshakeData.sessionID = connect.utils.parseSignedCookie(handshakeData.cookie['express.sid'], 'secret');
//
//         if (handshakeData.cookie['express.sid'] == handshakeData.sessionID) {
//             return accept('Cookie is invalid.', false);
//         }
//
//     } else {
//         return accept('No cookie transmitted.', false);
//     }
//
//     accept(null, true);
// });

io.on('connection', function (socket) {
    console.log('connected');
    socket.userName = getUserName();

    socket.on('chatMessage', function (data) {
        io.emit('chatMessage', {
            'userName' : socket.userName,
            'message' : data
        })
    });
});




