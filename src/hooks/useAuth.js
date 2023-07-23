import { useEffect } from 'react';
import clienteAxios from '../config/axios';
import useSWR from 'swr';
import { useNavigate } from 'react-router-dom';

export const useAuth = ({middleware, url}) => {

    const token = localStorage.getItem('AUTH_TOKEN')
    const navigate = useNavigate();

    const { data: user, error, mutate } = useSWR('/api/user', () => 
        clienteAxios('/api/user', {
            headers: {
                Authorization: `Bearer ${token}`
            }
        })
        .then(res => res.data)
        .catch(error => {
            throw Error(error?.response?.data?.errors)
        })
    )

    const login = async(datos, setErrores) => {

        try {
            const {data} = await clienteAxios.post('/api/login', datos)
             //conexion con la api de laravel
            localStorage.setItem('AUTH_TOKEN', data.token);
            setErrores([]) //limpiar errores de la consola
            await mutate()
        } catch (error) {
            setErrores(Object.values(error.response.data.errors))
        }

    }
    const registro = async (datos, setErrores) => {
        try {
            const {data} = await clienteAxios.post('/api/registro', datos) //conexion con la api de laravel
            localStorage.setItem('AUTH_TOKEN', data.token);
            setErrores([])
            await mutate()
        } catch (error) {
            setErrores(Object.values(error.response.data.errors) ) //captura de errores
        }
    }
    const logout = async() => {
        try {
           await clienteAxios.post('/api/logout', null, {
            headers: {
                Authorization: `Bearer ${token}`
            } 

            })
            localStorage.removeItem('AUTH_TOKEN') 
            await mutate(undefined) //forzar a SWR para ue cambie su valor una vez se cierre la sesion y asu vez borre el token
        } catch (error) {
            throw Error(error?.response?.data?.errors) 
        }
    }


    useEffect(() => { //redireccionar al usuario luego de hacer el login
        if(middleware === 'guest' && url && user) {
            navigate(url)
        }

        if(middleware === 'guest' && user && user.admin) {
            navigate('/admin');
        }

        if (middleware === 'admin' && user && !user.admin) {
            navigate('/');
        }

        if(middleware === 'auth' && error) {
            navigate('/auth/login')
        }
    }, [user, error])

    return {
        login,
        registro,
        logout,
        user,
        error
    }
}