import { NextResponse } from "next/server";
import prisma from "@db/db"
import bcrypt from 'bcryptjs'

// helpers
const getUserByToken = require('../../../helpers/get-user-by-token')
const getToken = require('../../../helpers/get-token')

// GetUserById
export async function GET(req: Request, { params }: { params: { id: string}}){
    const { id } = await params;

    try {
        const user = await prisma.user.findUnique({
            where: {
              id: parseInt(id, 10)
            }
          })
          if(!user){
            return NextResponse.json(
                {
                    message: "Usuário não encontrado"
                },
                {
                    status: 404
                }
            )
          }
          return Response.json({message: "OK", user})
    } catch (error) {
        return NextResponse.json(
            {
                message: "Error",
                error,
            },
            {
                status: 500
            }
        )
    }
}

// DeleteUserById
export async function DELETE(req: Request, { params }: { params: { id: string}}) {
    const { id } = await params;
    
    try {
        // Busca o token e depois busca o usuario pelo token
        const token = getToken(req)
        const tokenUser = await getUserByToken(token)

        // Verifica se o id passado é o mesmo do usuario do token ou se é admin
        if(parseInt(id, 10) !== tokenUser.id && tokenUser.permissao !== true){
            return NextResponse.json(
                {
                    message: "Acesso negado!"
                },
                {
                    status: 422
                }
            )
        }
        const user = await prisma.user.delete({
            where:{
                id: parseInt(id, 10)
            }
        })
        return NextResponse.json({ message: "OK", user})
    } catch (error) {
        return NextResponse.json(
            {
                message: "Error",
                error
            },
            {
                status: 500
            }
        )
    }
}

// updateUserById
export async function PATCH(req: Request, { params }: { params: { id: string}}){
    const { id } = await params;

    const { name, email, senha } = await req.json()
    
    try {
        // Busca o token e depois busca o usuario pelo token
        const token = getToken(req)
        const tokenUser = await getUserByToken(token)

        // Verifica se o id passado é o mesmo do usuario do token ou se é admin
        if(parseInt(id, 10) !== tokenUser.id && tokenUser.permissao !== true){
            return NextResponse.json(
                {
                    message: "Acesso negado!"
                },
                {
                    status: 422
                }
            )
        }
        // Validações
        if(!name){
            return NextResponse.json(
                {
                    message: 'o nome é obrigatório'
                },
                {
                    status: 422
                }
            )
        }
        if(!email){
            return NextResponse.json(
                {
                    message: 'O email é obrigatório'
                },
                {
                    status: 422
                }
            )
        }
        // Verificar se usuario já existe
        const userExists = await prisma.user.findUnique({
            where: {
            email: email,
            },
        });

        if(userExists && tokenUser.email !== email){
            return NextResponse.json(
                {
                    message: 'Email já cadastrado'
                },
                {
                    status: 422
                }
            )
        }
        // Pego a senha já criptografada do usuario caso ele não decida mudar de senha
        let passwordHash = tokenUser.senha

        if(senha){
            // Criar senha com criptografia
            const salt = await bcrypt.genSalt(12)
            passwordHash = await bcrypt.hash(senha, salt)
        }
        
        const user = await prisma.user.update({
            where:{
                id: parseInt(id, 10)
            },
            data:{
                name,
                email,
                senha: passwordHash
            }
        })

        return NextResponse.json({ message: "OK", user})
    } catch (error) {
        return NextResponse.json(
            {
                message: "Error",
                error
            },
            {
                status: 500
            }
        )
    }
}
