const User = require("../models/users");

exports.editar = async(req, res)=>{
    let reqData = req.body

    const consulta = await User.findOne({
        attributes:['id','name','email','password'],
        where:{
            email: reqData.email
        }
    })
    
    if(consulta == null){
        res.status(401).json({
            mensagem:'Usuário não encontrado'
        })
    }else{
        consulta.name = reqData.name

        if(reqData.email == consulta.email && reqData.email == reqData.newEmail){
            consulta.email = reqData.email
        }else{
            consulta.email = reqData.newEmail
        }
    
        consulta.password = reqData.password
        consulta.perfil = reqData.perfil

        consulta.save().then(()=>{

            res.status(200).json({
                mensagem:'Alteração realizada com sucesso!'
            })

        }).catch((err)=>{

            res.status(400).json({
                mensagem:'Alteração não realizada, tente novamente!: '+err
            })
            
        })
    }    
}