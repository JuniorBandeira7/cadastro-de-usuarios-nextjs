"use client"

import { useEffect, useState } from 'react'
import Button from '../components/Button'
import Header from '../components/Header'

interface User {
  id: string
  name: string
  email: string
  permissao: boolean
}

export default function UsuariosPage() {
  const [users, setUsers] = useState<User[]>([])
  const [isAdmin, setIsAdmin] = useState<boolean>(false)

  useEffect(() => {
    const fetchUsers = async () => {
      const token = localStorage.getItem("token")
      if (!token) {
        alert("Token não encontrado. Você precisa estar logado.")
        return
      }

      // Verifica se o usuário é admin
      const decodedToken = JSON.parse(atob(token.split('.')[1])) // Decodifica o token e pega as informações do usuario
      setIsAdmin(decodedToken.permissao)

      try {
        const response = await fetch('/api/users')
        if (!response.ok) {
          throw new Error("Erro ao buscar usuários")
        }
        const data = await response.json()
        setUsers(data.users)
      } catch (error) {
        console.error("Erro:", error)
      }
    }

    fetchUsers()
  }, [])

  const handleDelete = async (userId: string) => {
    const token = localStorage.getItem("token")

    try {
      const response = await fetch(`/api/user/${userId}`, {
        method: 'DELETE',
        headers: {
          "Authorization": `Bearer ${token}`,
        },
      })

      if (!response.ok) {
        throw new Error("Erro ao excluir usuário")
      }

      // Atualiza a lista de usuários após a exclusão
      setUsers(users.filter(user => user.id !== userId))
    } catch (error) {
      console.error("Erro:", error)
    }
  }

  return (
    <>
    <Header />
    <div className="p-4">
      <h1 className="text-3xl mb-4">Lista de Usuários</h1>
      <ul className="space-y-2">
        {users.map(user => (
          <li key={user.id} className="flex justify-between items-center bg-gray-700 p-2 rounded">
            <div>
              <strong>{user.name}</strong> - {user.email}
            </div>
            {isAdmin && ( // Se o usuario logado for admin libera opção de excluir
              <Button onClick={() => handleDelete(user.id)} className="bg-red-600 text-white">
                Excluir
              </Button>
            )}
          </li>
        ))}
      </ul>
    </div>
    </>
  )
}
