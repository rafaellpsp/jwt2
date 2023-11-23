const jwt = require('jsonwebtoken');

exports.Token = (payload, tokenKey)=>{

    let token;

    return token = jwt.sign(payload,tokenKey,{
        expiresIn: 600
    });
}