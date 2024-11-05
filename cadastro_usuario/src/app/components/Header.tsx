"use client";

import Link from 'next/link';

export default function Header() {
    const handleLogout = () => {
        
    };

    return (
        <header className="flex items-center justify-between p-4 h-16 bg-gray-800 text-white">
            <div className="flex items-center">
                <Link href="/">
                    <img src="../favicon.ico" alt="Logo" className="h-10 cursor-pointer" />
                </Link>
            </div>
            <nav className="flex items-center gap-6">
                <Link href="/editar" className="hover:text-gray-400 font-semibold">Editar</Link>
                <Link href="/" className="hover:text-gray-400 font-semibold">Usuários</Link>
                <button onClick={handleLogout} className="hover:text-gray-400 font-semibold focus:outline-none"> Deslogar </button>
            </nav>
        </header>
    );
}
