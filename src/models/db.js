require('module-alias/register')
require('dotenv').config({path:'.env'});
const Sequelize = require('sequelize');
const e = process.env;

const db = new Sequelize(e.database,e.user, e.password, {
    host: e.host,
    dialect: e.dialect
});

db.authenticate().then(()=>{
    console.log('Conectado com sucesso!')
}).catch((err)=>{
    console.log('Não foi possível conectar ao banco de dados!')
})

module.exports = db;