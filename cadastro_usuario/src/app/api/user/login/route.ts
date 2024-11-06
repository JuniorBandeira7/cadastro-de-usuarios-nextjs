import { NextRequest, NextResponse } from "next/server"
import bcrypt from 'bcryptjs'
import User  from "@/models/User"
import connectToDatabase from "@db/db"

connectToDatabase()

// helpers
const createUserToken = require('../../../helpers/create-user-token')

export async function POST(req: Request) {
    const { email, senha } = await req.json()

    // validações
    if (!email) {
        return NextResponse.json({ message: 'O email é obrigatório' }, { status: 422 })
    }

    if (!senha) {
        return NextResponse.json({ message: 'A senha é obrigatória' }, { status: 422 })
    }

    // Verificar se usuario já existe
    const user = await User.findOne({ email })
    if (!user) {
        return NextResponse.json(
            { message: 'Email não cadastrado' },
            { status: 422 }
        )
    }

    //check if password match
    const checkPassword = await bcrypt.compare(senha, user.senha)
    if (!checkPassword) {
        return NextResponse.json(
            {
                message: 'Senha não corresponde'
            },
            {
                status: 422
            }
        )
    }

    // Criar token
    const token = await createUserToken(user)

    return Response.json({ message: "ok", user, token })
}

