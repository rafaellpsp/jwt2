require('dotenv').config({path:'.env'});
const User = require('../models/users');
const msgSuccess = 'Login realizado com sucesso!';
const msgError = 'E-mail ou senha invalidos, verifique seus dados!';
const msgStatusSuccess = 'sucesso';
const msgStatusErro = 'erro';
const jwt = require('jsonwebtoken');
const env = process.env;
const { Token } = require('../scripts/Token');

exports.login = async (req, res) => {

    let reqData = req.body

    if (reqData.email == "" || reqData.password == "") {

        res.status(400).json({
            msg: msgError,
            status: msgStatusErro
        })

    } else {
        const consulta = await User.findOne({
            attributes: ['id', 'name', 'password','perfil'],
            where: {
                email: reqData.email
            }
        })

        if (consulta == null) {
            res.status(400).json({
                msg: msgError,
                status: msgStatusErro
            })
        } else {

            const payload = {
                id:consulta.id,
                user:consulta.name,
                perfil:consulta.perfil
            }

            
            var token = jwt.sign(payload,env.tokenKey,{
                expiresIn: 600
            });

            if (reqData.password == consulta.password) {
                res.status(200).json({
                    id:consulta.id,
                    perfil:consulta.perfil,
                    status: msgStatusSuccess,
                    msg: msgSuccess,
                    Token:token,
                })
                
            } else {
                res.status(400).json({
                    msg: msgError,
                    status: msgStatusErro
                })
            }
        }

    }
}