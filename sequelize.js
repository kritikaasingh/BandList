const Sequelize = require('sequelize')
const sequelize = new Sequelize('BandList', 'kritika', '123456', {
  dialect: 'sqlite',
  storage: './db.sqlite3'
})

module.exports = sequelize 