const name = process.argv[2],
      password = process.argv[3],
      checkCrerentials = require('./auth').checkCrerentials;

checkCrerentials(name, password);







