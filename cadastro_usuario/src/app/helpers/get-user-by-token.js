const jwt = require('jsonwebtoken')
import User  from "@/models/User"

const getUserByToken = async (token) => {
    if (!token) {
        return { status: 401, message: "Acesso Negado!" }
    }
    
    try {
        const decoded = jwt.verify(token, 'secret')
        const userId = decoded._id      

        const user = await User.findById(userId)

        if (!user) {
            return { status: 404, message: "Usuário não encontrado!" }
        }

        return user
    } catch (error) {
        return { status: 401, message: "Token inválido!" }
    }
}

module.exports = getUserByToken
