"use client"

import Link from 'next/link'
import { useEffect, useState } from 'react'

interface User {
    id: string
    name: string
    email: string
    permissao: boolean
}

export default function Header() {
    const [user, setUser] = useState<User | null>(null)

    const handleLogout = () => {

    }

    useEffect(() => {
        const fetchUsers = async () => {
            const token = localStorage.getItem("token")
            if (!token) {
                alert("Token não encontrado. Você precisa estar logado.")
                return
            }

            const decodedToken = JSON.parse(atob(token.split('.')[1])) // // Decodifica o token e pega as informações do usuario
            setUser(decodedToken)
        }
        fetchUsers()
    }, [])

    return (
        <header className="flex items-center justify-between p-4 h-16 bg-gray-800 text-white">
            <div className="flex items-center">
                <Link href="/">
                    <img src="../favicon.ico" alt="Logo" className="h-10 cursor-pointer" />
                </Link>
            </div>
            <nav className="flex items-center gap-6">
                <Link href={`/editar?id=${user?.id}`} className="hover:text-gray-400 font-semibold">Editar</Link>
                <Link href="/usuarios" className="hover:text-gray-400 font-semibold">Usuários</Link>
                <button onClick={handleLogout} className="hover:text-gray-400 font-semibold focus:outline-none"> Deslogar </button>
            </nav>
        </header>
    )
}
