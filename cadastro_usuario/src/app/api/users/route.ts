import User  from "@/models/User"
import { NextResponse, NextRequest } from 'next/server'
import connectToDatabase from "@db/db"

connectToDatabase()

export async function GET(req: NextRequest) {
    try {
        const users = await User.find()
        return NextResponse.json({ message: "OK", users })
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