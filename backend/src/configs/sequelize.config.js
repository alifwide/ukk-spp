
const { MYSQL } = require('./server.config')

module.exports = {
  "development": {
    "username": MYSQL.user,
    "password": MYSQL.password,
    "database": MYSQL.database,
    "host": "127.0.0.1",
    "dialect": "mysql"
  },
  "test": {
    "username": MYSQL.user,
    "password": MYSQL.password,
    "database": MYSQL.database,
    "host": "127.0.0.1",
    "dialect": "mysql"
  },
  "production": {
    "username": MYSQL.user,
    "password": MYSQL.password,
    "database": MYSQL.database,
    "host": "127.0.0.1",
    "dialect": "mysql"
  }
}
