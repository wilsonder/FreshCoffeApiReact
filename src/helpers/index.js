export const formatearDinero = cantidad => { //aqui formateamos el precio para que agregue el signo de dolares $
    return cantidad.toLocaleString('en-US', {
        style: 'currency',
        currency: 'USD'
    })
}