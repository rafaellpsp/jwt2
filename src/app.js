const express = require('express');
const Jwt = require('jsonwebtoken');
const app = express();
const login = require('./routes/login');
const signIn = require('./routes/signin');
const editar = require('./routes/editar');
const deletar = require('./routes/deletar');
const listar = require('./routes/listar');
const { eAdmin } = require('./middlewares/Auth');
const cors = require('cors');

app.use(express.json())

app.use((req, res, next)=>{
    res.header("Access-Control-Allow-Origin","*")
    res.header("Access-Control-Allow-Methods","GET, POST, PATCH, PUT")
    res.header('Access-Control-Allow-Headers','Content-Type')
    app.use(cors())
    next()
})

app.use('/login', login);
app.use('/signin', signIn)
app.use('/edit', editar)
app.use('/deletar', deletar)
app.use('/listar', eAdmin,listar)

module.exports = app