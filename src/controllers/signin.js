const User = require('../models/users')
exports.signin = async (req, res) => {

    let reqData = req.body

    const consulta = await User.findOne({
        attributes: ['id', 'name', 'email', 'perfil'],
        where: {
            email: reqData.email
        }
    })
    

    if (consulta == null) {

        if (reqData.password == reqData.confirmePassword) {

            User.create(reqData).then(() => {
                return res.status(200).json({
                    mensagem: 'Cadastrado com sucesso!'
                })
            }).catch((err) => {
                return res.status(400).json({
                    mensagem: 'Erro ao cadastrar'
                })
            })
        } else {
            return res.status(200).json({
                mensagem: 'As senhas não são identicas!!!!'
            })
        }

    } else {
        return res.status(400).json({
            mensagem: 'E-mail invalido, tente outro e-mail!'
        })
    }


}