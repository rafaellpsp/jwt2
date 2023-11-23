const User = require('../models/users')
exports.deletar = async(req, res)=>{

    const reqData = req.body

    const cons = await User.findOne({
        attributes:['id','name','email','password'],
        where:{
            email:reqData.email
        }
    })

    if(cons == null){
        return res.status(401).json({
            mensagem:'Não encontrado!'
        })
    }else{
        const del = await User.destroy({
            attributes:['id','name','password'],
            where:{
                email:reqData.email
            }
        })

        return res.status(200).json({
            mensagem:`O usuário ${cons.name} foi deletado!`
        })
    }
}