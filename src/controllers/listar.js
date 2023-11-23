const User = require('../models/users')

exports.listar = async(req, res)=>{

    const reqData = req.body

    const consulta = await User.findOne({
        attributes:['id', 'name', 'email', 'perfil','createdAt','updatedAt'],
        where:{
            id:reqData.id
        }
    })

    res.status(200).json({
        consulta
    })
}