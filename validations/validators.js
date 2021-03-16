// Para crear validaciones: 
// 1.llamamos a la función en el endpoint donde lo vamos a utilizar. 
// 2.Creamos la const "validations" en este fichero y dentre de ahí creamos las funciones necesarias (siempre con el parámetro).
// 3. Exportamos el module 
// 4.lo requerimos donde lo vayamos a usar
//Usamos esto para que nos dé el error de forma síncrona y así no tener que entrar al servidor.


const validations = {
    validateEmail(email){
        if(typeof email !== 'string') throw new TypeError(`${email} No es un email`)
        if(!email.trim().length) throw new Error ('El email está vacio')
    },
    validatePassword(password){
        if(typeof password !== 'string') throw new TypeError(`${password} no es una contraseña`)
        if(!password.trim().length) throw new Error('La contraseña está vacia')
        if(password.length <6 ) throw new Error ('La contraseña debe contener mínimo seis carateres')
    }
}

module.exports = validations