const dotenv = require('dotenv');
const jwt = require('jsonwebtoken');
const { env } = require('process');
const { promisify } = require('util');


module.exports = {
    eAdmin: async function(req, res, next){
        const authHeader = req.headers.authorization

        if(!authHeader){
           return res.status(400).json({
                erro:true,
                mensagem:"Necessário fazer login!"
            })
        }

        const [/*bearer*/, token] = authHeader.split(' ');

        if(!token){
            return res.status(400).json({
                erro:true,
                mensagem:"Necessário fazer o login! Falta o token B"
            })
        }

        try{
            const decode = await promisify(jwt.verify)(token, env.tokenKey);
            req.Id = decode.id;    
            
            if(decode.perfil == "Administrador"){
                return next()
            }else{
                res.status(400).json({
                    mensagem:'Você não é administrador'
                })
            }
            

        }catch(err){
            return res.status(400).json({
                erro:err,
                mensagem:"Necessário fazer login! Token Invalido C"
            })
        }
    }
}