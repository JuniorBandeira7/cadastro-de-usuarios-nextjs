// app/api/auth/validate-token/route.ts

import { NextResponse } from "next/server"

// helpers
const getUserByToken = require('../../../../helpers/get-user-by-token')
const getToken = require('../../../../helpers/get-token')

export async function GET(req: Request, { params }: { params: { id: string } }) {
    const token = getToken(req)
    const user = await getUserByToken(token)
    const { id } = await params

    if (user.id.toString() !== id) {
        return NextResponse.json({ message: "Acesso negado!" }, { status: 403 })
    }

    return NextResponse.json({ message: "Token válido", user }, { status: 200 })
}
