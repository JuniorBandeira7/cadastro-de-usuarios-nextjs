import { NextResponse } from "next/server"
import User  from "@/models/User"
import bcrypt from 'bcryptjs'
import connectToDatabase from "@db/db"

connectToDatabase()

// helpers
const getUserByToken = require('../../../helpers/get-user-by-token')
const getToken = require('../../../helpers/get-token')

// GetUserById
export async function GET(req: Request, { params }: { params: { id: string } }) {
    const { id } = await params

    try {
        const user = await User.findById(id)

        if (!user) {
            return NextResponse.json(
                { message: "Usuário não encontrado" },
                { status: 404 }
            )
        }
        return NextResponse.json({ message: "OK", user })
    } catch (error) {
        return NextResponse.json(
            { message: "Erro ao buscar usuário", error },
            { status: 500 }
        )
    }
}

// DeleteUserById
export async function DELETE(req: Request, { params }: { params: { id: string } }) {
    const { id } = await params

    // Busca o token e depois busca o usuario pelo token
    const token = getToken(req)
    const tokenUser = await getUserByToken(token)

    // Verifica se o id passado é o mesmo do usuario do token ou se é admin
    if (id !== tokenUser._id && !tokenUser.permissao) {
        return NextResponse.json(
            { message: "Acesso negado!" },
            { status: 403 }
        )
    }

    try {
        const user = await User.findByIdAndDelete(id)
        return NextResponse.json({ message: "OK", user })
    } catch (error) {
        return NextResponse.json(
            { message: "Erro ao deletar usuário", error },
            { status: 500 }
        )
    }
}

// updateUserById
export async function PATCH(req: Request, { params }: { params: { id: string } }) {
    const { id } = await params

    const { name, email, senha } = await req.json()

    // Validações
    if (!name) {
        return NextResponse.json({ message: 'O nome é obrigatório' }, { status: 422 })
    }

    if (!email) {
        return NextResponse.json({ message: 'O email é obrigatório' }, { status: 422 })
    }

    // Busca o token e depois busca o usuario pelo token
    const token = getToken(req)
    const tokenUser = await getUserByToken(token)

    // Verifica se o id passado é o mesmo do usuario do token ou se é admin
    if (id !== tokenUser._id && !tokenUser.permissao) {
        return NextResponse.json(
            { message: "Acesso negado!" },
            { status: 403 }
        )
    }

    // Verificar se usuario já existe
    const userExists = await User.findOne({ email })
    // verifica se quem está fazendo a mudança é admin pois admin pode alterar outros emails
    if (userExists && userExists.id !== id && !tokenUser.permissao) {
        return NextResponse.json(
            { message: 'Email já cadastrado' },
            { status: 422 }
        )
    }

    // Pego a senha já criptografada do usuario caso ele não decida mudar de senha
    let passwordHash = tokenUser.senha

    if (senha) {
        // Criar senha com criptografia
        const salt = await bcrypt.genSalt(12)
        passwordHash = await bcrypt.hash(senha, salt)
    }

    try {
        const user = await User.findByIdAndUpdate(
            id,
            { name, email, senha: passwordHash },
            { new: true, runValidators: true }
        )

        return NextResponse.json({ message: "OK", user })
    } catch (error: any) {
        // É necessária essa verificação pois admin pode alterar outros emails
        // Se o admin mudar o email de alguem para algum que já existe não iria entrar na verificação anterior
        if (error.code === 11000) {
            return NextResponse.json(
                { message: "Email já cadastrado!" },
                { status: 422 }
            )
        }
        return NextResponse.json(
            { message: "Erro ao atualizar usuário", error },
            { status: 500 }
        );
    }
}
