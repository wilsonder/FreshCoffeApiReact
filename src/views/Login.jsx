import { Link } from 'react-router-dom'
import { createRef, useState } from 'react'
import Alerta from '../components/Alerta';
import { useAuth } from '../hooks/useAuth';

export default function Login() {

    const emailRef = createRef();
    const passwordRef = createRef();
    
    const [errores, setErrores] = useState([]) //captura de errores para mostrarlos en pantalla
    const { login } = useAuth({
        middleware: 'guest', //guest (No Autenticado)
        url: '/'
    })

    const handleSubmit = async e => { // Funcion para capturar los datos
        e.preventDefault();

        const datos = {           
            email: emailRef.current.value,
            password: passwordRef.current.value,          
        }

        login(datos, setErrores)
        
    }

  return (
    
    <> {/* este fragmento permite retornar varios elementos dentro del componente (<> </>) */}

        <h1 className="text-4xl font-black">Iniciar Sesión</h1>
        <p>Para crear un pedido debes iniciar sesión</p>

        <div className="bg-white shadow-md rounded-md mt-10 px-5 py-10">
            <form
                onSubmit={handleSubmit}
                noValidate
            >
                {errores ? errores.map(error => <Alerta key={error}>{error}</Alerta>) : null}
                
                <div className="mb-4">
                    <label htmlFor="email" className="text-slate-800">Email:</label>
                    <input type="email" id="email" name="email" placeholder="Tu Email" ref={emailRef} className="mt-2 w-full p-3 bg-gray-50 "/>
                </div>
                <div className="mb-4">
                    <label htmlFor="password" className="text-slate-800">Password:</label>
                    <input type="password" id="password" name="password" placeholder="Tu Password" ref={passwordRef} className="mt-2 w-full p-3 bg-gray-50 "/>
                </div>
                
                <input type="submit" value="Iniciar Sesión" className="bg-indigo-600 hover:bg-indigo-800 text-white w-full mt-5 p-3 uppercase font-bold cursor-pointer" />
            </form>
            <nav className="mt-5">
                <Link to="/auth/registro">¿No tienes cuenta? Crea una</Link>
            </nav>
        </div>
    </>

  )
}
