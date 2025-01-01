import { Link } from 'react-router-dom'

export const Unauthorized = () => {
  return (
    <div className="flex flex-col items-center justify-center min-h-screen">
      <h1 className="text-2xl font-bold mb-4">Acesso não autorizado</h1>
      <p className="mb-4">
        Você não tem permissão para acessar esta página.
      </p>
      <Link
        to="/"
        className="px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600"
      >
        Voltar para a página inicial
      </Link>
    </div>
  )
}
