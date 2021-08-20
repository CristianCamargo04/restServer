const jwt = require("jsonwebtoken");
//==============================
// Verificar Token
//==============================
let verificaToken = (req, res, next) => {
    let token = req.get("token");
    jwt.verify(token, process.env.SEED, (err, decode) => {
        if (err) {
            return res.status(401).json({
                ok: false,
                err: {
                    message: 'token no valido'
                },
            });
        }
        req.usuario = decode.usuario;
        next();
    });
};
//==============================
// Verificar Token
//==============================
let isAdmin = (req, res, next) => {
    let usuario = req.usuario;
    if (usuario.role !== "ADMIN_ROLE") {
        return res.json({
            ok: false,
            err: {
                message: "El usuario no es administrador",
            },
        });
    }
    next();
};
//==============================
// Verificar Token para imagen
//==============================
let verificaTokenImg = (req, res, next) => {
    let token = req.query.token;
    jwt.verify(token, process.env.SEED, (err, decode) => {
        if (err) {
            return res.status(401).json({
                ok: false,
                err: {
                    message: 'token no valido'
                },
            });
        }
        req.usuario = decode.usuario;
        next();
    });
};

module.exports = {
    verificaToken,
    isAdmin,
    verificaTokenImg,
};