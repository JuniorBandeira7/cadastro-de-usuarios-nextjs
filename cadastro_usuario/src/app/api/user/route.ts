import { NextRequest, NextResponse } from "next/server"
import bcrypt from 'bcryptjs'
import User  from "@/models/User"
import connectToDatabase from "@db/db"

connectToDatabase()

// helpers
const createUserToken = require('../../helpers/create-user-token')

export async function POST(req: Request) {
    const { name, email, senha, permissao } = await req.json()

    // validações
    if (!name) {
        return NextResponse.json({ message: 'O nome é obrigatório' }, { status: 422 })
    }

    if (!email) {
        return NextResponse.json({ message: 'O email é obrigatório' }, { status: 422 })
    }

    if (!senha) {
        return NextResponse.json({ message: 'A senha é obrigatória' }, { status: 422 })
    }

    // Verificar se usuario já existe
    const userExists = await User.findOne({ email })
    if (userExists) {
        return NextResponse.json(
            { message: 'Email já cadastrado' },
            { status: 422 }
        )
    }

    // Criar senha com criptografia
    const salt = await bcrypt.genSalt(12)
    const passwordHash = await bcrypt.hash(senha, salt)

    try {
        const user = await User.create({
            name,
            email,
            senha: passwordHash,
            permissao,
        })

        const token = await createUserToken(user)
        return NextResponse.json(
            { message: "OK", user, token }
        )
    } catch (error) {
        return NextResponse.json(
            { message: "Erro ao criar usuário", error },
            { status: 500 }
        )
    }
}