import { NextResponse } from "next/server";
import { NextRequest } from "next/server";

// helpers
const getUserByToken = require('../../../../helpers/get-user-by-token');
const getToken = require('../../../../helpers/get-token');

// A função de rota GET
export async function GET(req: NextRequest, { params }: { params: { id: string } }) {
    const token = getToken(req);
    const user = await getUserByToken(token);
    const { id } = params;  // Obtendo o parâmetro da URL corretamente

    // Compara o id do usuário com o parâmetro da URL
    if (user._id.toString() !== id) {
        return NextResponse.json({ message: "Acesso negado!" }, { status: 403 });
    }

    return NextResponse.json({ message: "Token válido", user }, { status: 200 });
}
