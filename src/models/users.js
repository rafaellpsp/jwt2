const Sequelize = require('sequelize');
const db = require('./db');

const User = db.define('usuarios',{
    id:{
        type: Sequelize.INTEGER,
        autoIncrement: true,
        allowNul: false,
        primaryKey: true
    },
    name:{
        type: Sequelize.STRING,
        allowNul: false
    },
    email:{
        type: Sequelize.STRING,
        allowNul: false
    },
    password:{
        type: Sequelize.STRING,
        allowNul: false
    },
    perfil:{
        type: Sequelize.STRING,
        allowNul: false
    }
})

//User.sync()
//User.sync({force: true})
//User.sync({alter: true})

module.exports = User;