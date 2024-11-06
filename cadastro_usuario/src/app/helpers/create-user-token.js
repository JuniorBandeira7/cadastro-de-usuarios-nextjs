const jwt = require('jsonwebtoken')

const createUserToken = async (user) => {
    const token = jwt.sign({ _id: user._id, nome: user.nome, permissao: user.permissao }, 'secret', { expiresIn: '48h' })
    return token
}

module.exports = createUserToken