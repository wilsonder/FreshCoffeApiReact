import { createRef, useState } from 'react'
import { Link } from 'react-router-dom'
import clienteAxios from '../config/axios';
import Alerta from '../components/Alerta';
import { useAuth } from '../hooks/useAuth';

export default function Registro() {

    //aqui creamos las variables que van a leer los datos que ingresemos en el formulario

    const nameRef = createRef();
    const emailRef = createRef();
    const passwordRef = createRef();
    const passwordConfirmationRef = createRef();

    const [errores, setErrores] = useState([]) //captura de errores para mostrarlos en pantalla
    const {registro} = useAuth({middleware: 'guest', url: '/'})

    const handleSubmit = async e => { // Funcion para capturar los datos
        e.preventDefault();

        const datos = {
            name: nameRef.current.value,
            email: emailRef.current.value,
            password: passwordRef.current.value,
            password_confirmation: passwordConfirmationRef.current.value
        }

        registro(datos, setErrores)
        
    }

  return (
    <> {/* este fragmento permite retornar varios elementos dentro del componente (<> </>) */}

        <h1 className="text-4xl font-black">Crea tu Cuenta</h1>
        <p>Crea tu cuenta llenando el formulario</p>

        <div className="bg-white shadow-md rounded-md mt-10 px-5 py-10">
            <form
               onSubmit={handleSubmit}
               noValidate 
            >
                {errores ? errores.map(error => <Alerta key={error}>{error}</Alerta>) : null}

                <div className="mb-4">
                    <label htmlFor="name" className="text-slate-800">Nombre:</label>
                    <input type="text" id="name" name="name" placeholder="Tu Nombre" ref={nameRef} className="mt-2 w-full p-3 bg-gray-50 "/>
                </div>
                <div className="mb-4">
                    <label htmlFor="email" className="text-slate-800">Email:</label>
                    <input type="email" id="email" name="email" placeholder="Tu Email" ref={emailRef} className="mt-2 w-full p-3 bg-gray-50 "/>
                </div>
                <div className="mb-4">
                    <label htmlFor="password" className="text-slate-800">Password:</label>
                    <input type="password" id="password" name="password" placeholder="Tu Password" ref={passwordRef} className="mt-2 w-full p-3 bg-gray-50 "/>
                </div>
                <div className="mb-4">
                    <label htmlFor="password_confirmation" className="text-slate-800">Repetir Password:</label>
                    <input type="password" id="password_confirmation" name="password_confirmation" placeholder="Repetir Password" ref={passwordConfirmationRef} className="mt-2 w-full p-3 bg-gray-50 "/>
                </div>
                <input type="submit" value="Crear Cuenta" className="bg-indigo-600 hover:bg-indigo-800 text-white w-full mt-5 p-3 uppercase font-bold cursor-pointer" />
            </form>
        </div>
        <nav className="mt-5">
                <Link to="/auth/login">¿Ya tienes cuenta? Inicia Sesión</Link>
            </nav>
    </>
  )
}
