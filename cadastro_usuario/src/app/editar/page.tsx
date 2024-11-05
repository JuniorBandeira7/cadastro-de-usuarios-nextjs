"use client"

import { useState, useEffect } from "react"
import { useSearchParams } from "next/navigation";
import { useRouter } from "next/navigation"
import Button from "../components/Button"

export default function EditUserPage() {
  const [name, setName] = useState("")
  const [email, setEmail] = useState("")
  const [senha, setSenha] = useState("")
  const router = useRouter()
  const searchParams = useSearchParams();
  const id = parseInt(searchParams.get("id") ?? "0", 10)

  useEffect(() => {
    async function validateToken() {
      const token = localStorage.getItem("token")
      const tokenResponse = await fetch(`/api/auth/validate-token/${id}`, {
        method: "GET",
        headers: {
            "Authorization": `Bearer ${token}`,
        },
    })
        if (!tokenResponse.ok) {
            router.push('/') // Redireciona para a página inicial se o token não for válido
            return
        } 
      }
      validateToken()

    // Função para buscar os dados do usuário na rota GET e preenchê-los no formulário
    async function fetchUser() {
      try {
        const response = await fetch(`/api/user/${id}`)
        const data = await response.json()
        if (response.ok) {
          setName(data.user.name)
          setEmail(data.user.email)
        } else {
          console.log(data.message)
        }
      } catch (error) {
        console.error("Erro ao buscar dados do usuário:", error)
      }
    }
    fetchUser()
  }, [id])

  const handleUpdate = async () => {
    try {
      const response = await fetch(`/api/user/${id}`, {
        method: "PATCH",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ name, email, senha }),
      })
      const data = await response.json()
      if (response.ok) {
        console.log("Usuário atualizado com sucesso")
        router.push("/") // Redireciona para a página de tarefas
      } else {
        console.log(data.message)
      }
    } catch (error) {
      console.error("Erro ao atualizar usuário:", error)
    }
  }

  const handleDelete = async () => {
    try {
      const response = await fetch(`/api/user/${id}`, {
        method: "DELETE",
      })
      const data = await response.json()
      if (response.ok) {
        console.log("Usuário excluído com sucesso")
        router.push("/home") // Redireciona para a página de tarefas
      } else {
        console.log(data.message)
      }
    } catch (error) {
      console.error("Erro ao excluir usuário:", error)
    }
  }

  return (
    <div className="flex items-center justify-center h-screen bg-black">
      <div className="flex flex-col items-center justify-center bg-gray-800 p-8 rounded-lg w-96">
        <h1 className="text-white text-3xl mb-6">Editar Usuário</h1>
        <input
          type="text"
          value={name}
          onChange={(e) => setName(e.target.value)}
          placeholder="Nome"
          className="mb-4 p-2 rounded bg-gray-700 text-white w-full"
        />
        <input
          type="email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          placeholder="Email"
          className="mb-4 p-2 rounded bg-gray-700 text-white w-full"
        />
        <input
          type="password"
          value={senha}
          onChange={(e) => setSenha(e.target.value)}
          placeholder="Senha"
          className="mb-4 p-2 rounded bg-gray-700 text-white w-full"
        />
        <Button onClick={handleUpdate} className="mb-2 w-full bg-blue-600 text-white">
          Atualizar
        </Button>
        <Button onClick={handleDelete} className="w-full bg-red-600 text-white">
          Excluir
        </Button>
      </div>
    </div>
  )
}
