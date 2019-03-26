const User = require('./user.js').User,
      user = new User();

exports.checkCrerentials = function checkCredentials(name, password) {
    user.findByName(name)
        .then(user => {
            if (!user) {
                console.log('No such account');
            } else if (user.password == password) {
                console.log('You are logged in');
            } else {
                console.log('Password is incorrect');
            }
        })
        .catch(err => {
            console.log(err.message);
        });
}