"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import Button from "../components/Button";

export default function LoginForm() {
  const [email, setEmail] = useState("");
  const [senha, setSenha] = useState("");
  const router = useRouter();

  const handleLogin = async () => {
    try {
      const response = await fetch("/api/user/login", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ email, senha }),
      });

      const data = await response.json();

      if (response.ok) {
        // Armazena o token no localStorage
        localStorage.setItem("token", data.token);
        console.log(data.token);
        router.push("/"); // Redireciona para a página inicial após o login
      } else {
        console.error(data.message); // Exibe a mensagem de erro
      }
    } catch (error) {
      console.error("Erro ao fazer login:", error);
    }
  };

  const handleRegister = () => {
    // Lógica de cadastro aqui
    console.log("Cadastrar");
  };

  return (
    <div className="flex items-center justify-center h-screen">
      <div className="flex flex-col items-center justify-center bg-gray-800 p-8 rounded-lg w-96">
        <h1 className="text-white text-3xl mb-6">Login</h1>
        <input
          type="email"
          placeholder="Email"
          value={email} // Atualiza o valor do input
          onChange={(e) => setEmail(e.target.value)} // Atualiza o estado ao mudar o input
          className="mb-4 p-2 rounded bg-gray-700 text-white"
        />
        <input
          type="senha"
          placeholder="Senha"
          value={senha} // Atualiza o valor do input
          onChange={(e) => setSenha(e.target.value)} // Atualiza o estado ao mudar o input
          className="mb-4 p-2 rounded bg-gray-700 text-white"
        />
        <Button onClick={handleLogin} className="mb-2">
          Entrar
        </Button>
        <Button onClick={handleRegister}>Cadastrar</Button>
      </div>
    </div>
  );
}
