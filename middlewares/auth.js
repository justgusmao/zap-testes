function auth(req, res, next) {
    // Lógica de autenticação aqui

    if (req.headers.authorization) {
        // Autenticação bem-sucedida
        console.log(req.headers.authorization);
        next();
    } else {
        res.status(401).send('Não autorizado');
    }
}
  
module.exports = auth;