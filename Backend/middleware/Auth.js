const jwt = require('jsonwebtoken')

module.exports = (req, res, next) =>{
    const authHeader = req.get('Autorization');

    //para que solo se puedan ver con autorizacion
    if(!authHeader) {
        const error = new Error('No autenticado, no hay JWT');
        error.statusCode = 401;
        throw error;
    }
    const token = authHeader.split(' ')[1];//se obtiene el token.
    let viewToken;
    try {
        viewToken = jwt.verify(token,'REACT_NODE')//poner llave en proccess.port
    } catch (error) {
        error.statusCode= 500;
        throw error;
    }
    if(!viewToken){
        const error = new Error('No autenticado')
        error.statusCode = 401;
        throw error;
    }
}