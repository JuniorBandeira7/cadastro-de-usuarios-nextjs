import { NextResponse } from "next/server";
import prisma from "@db/db"

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

        // Verifica se o id passado é o mesmo do usuario do token
        if(parseInt(id, 10) !== tokenUser.id){
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