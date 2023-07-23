import useQuiosco from "../hooks/useQuiosco"
import Categoria from "./Categoria"
import { useAuth } from "../hooks/useAuth"

export default function Slidebar() {
    const { categorias } = useQuiosco()
    const {logout, user} = useAuth({middleware: 'auth'})

  return (
    <aside className="md:w-72">
        <div className="p-4">
            <img src="img/logo.svg" alt="Imagen Logo" className="w-40" />
        </div>

        <p className="my-10 text-xl text-center">Hola: {user?.name}</p>

        <div className="mt-10">
            {categorias.map( categoria => (
                <Categoria //props
                    key={categoria.id} //key para id unico 
                    categoria = {categoria}
                />
            ))}
        </div>
        <div className="my-5 px-5">
            <button type="button" className="text-center bg-red-500 w-full p-3 font-bold text-white truncate" onClick={logout}>
                Cancelar Orden
            </button>
        </div>
    </aside>
  )
}
