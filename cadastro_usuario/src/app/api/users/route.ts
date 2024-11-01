import prisma from "@db/db"
import { NextRequest, NextResponse } from "next/server"

export async function GET(req: NextRequest) {
    try {
        const users = await prisma.user.findMany()
        return Response.json({message: "OK", users})
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