const dotenv = require('dotenv');
const jwt = require('jsonwebtoken');
const User = require('../models/users');
const { env } = require('process');
const { promisify } = require('util');
const { Token } = require('../scripts/Token');

module.exports = {
    eAdmin: async function (req, res, next) {

        const authHeader = req.headers.authorization
        const user = parseInt(req.body.id)

        try {
            const [bearer, token] = authHeader.split(' ');
            const decode = await promisify(jwt.verify)(token, env.tokenKey)

            if (user === decode.id) {
                return res.status(200).json({
                    decode
                })
            } else {
                return res.status(400).json({
                    msg: 'Redirecionar para tela de login'
                })
            }
        } catch (err) {

            const dbConsulta = await User.findOne({
                attributes: ['id', 'name', 'password', 'perfil'],
                where: {
                    id: user
                }
            });

            const Payload = {
                id:dbConsulta.id,
                name:dbConsulta.name,
                perfil: dbConsulta.perfil
            }

            const token = Token(Payload, env.tokenKey);

            if (err.name == 'TokenExpiredError') {
                return res.status(200).json({
                    msg: 'Token Expirou!',
                    token
                });
            }
        }
    }
}