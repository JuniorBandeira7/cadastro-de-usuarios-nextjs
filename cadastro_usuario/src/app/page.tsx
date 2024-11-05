"use client"

import { useEffect, useState } from "react"
import { useRouter } from 'next/navigation'
import Header from "../app/components/Header"

interface User {
  id: string
  name: string
  email: string
  permissao: boolean
}

export default function Home() {
  const [user, setUser] = useState<User | null>(null)
  const router = useRouter()

  useEffect(() => {
    const fetchUserData = async () => {
      const token = localStorage.getItem("token")
      if (!token) {
        router.push("/login")
        return
      }

      try {
        const decodedToken = JSON.parse(atob(token.split('.')[1])) // Decodifica o token e pega as informações do usuário
        const userId = decodedToken.id

        const userResponse = await fetch(`/api/user/${userId}`, {
          method: "GET",
          headers: {
            "Authorization": `Bearer ${token}`,
          },
        })

        if (userResponse.ok) {
          const data = await userResponse.json()
          setUser(data.user)
        } else {
          alert("Erro ao carregar dados do usuário")
        }
      } catch (error) {
        console.error(error)
        alert("Erro ao decodificar o token ou buscar os dados do usuário")
      }
    }

    fetchUserData()
  }, [])

  return (
    <>
      <Header />
      <div className="flex justify-center items-center min-h-screen">
        <div className="bg-gray-700 text-white p-8 rounded-lg shadow-lg w-full max-w-md">
          <h1 className="text-2xl font-bold mb-4">{user?.name}</h1>
          <p><strong>Id:</strong>{user?.id}</p>
          <p><strong>Email:</strong> {user?.email}</p>
          <p><strong>Tipo de usuário:</strong> {user?.permissao ? "Admin" : "Cliente"}</p>
        </div>
      </div>
    </>
  )
}
