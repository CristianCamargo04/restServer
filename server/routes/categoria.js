const express = require("express");
const Categoria = require("../models/categoria");
const { verificaToken, isAdmin } = require("../middlewares/autenticacion");
const route = express();

route.get("/categoria", verificaToken, (req, res) => {
    Categoria.find({})
        .sort('nombre')
        .populate("usuario", "nombre email")
        .exec((err, categorias) => {
            if (err) {
                return res.status(500).json({
                    ok: false,
                    err,
                });
            }
            res.json({
                ok: true,
                categorias,
            });
        });
});

route.get("/categoria/:id", verificaToken, (req, res) => {
    let id = req.params.id;
    Categoria.findById(id, (err, categoriaDB) => {
        if (err) {
            return res.status(500).json({
                ok: false,
                err,
            });
        }
        if (!categoriaDB) {
            return res.status(400).json({
                ok: false,
                err: {
                    message: "El id de la categoria no existe",
                },
            });
        }
        res.json({
            ok: true,
            categoria: categoriaDB,
        });
    });
});

route.post("/categoria", verificaToken, (req, res) => {
    let body = req.body;
    let categoria = new Categoria({
        nombre: body.nombre,
        usuario: req.usuario._id,
    });

    categoria.save((err, categoriaDB) => {
        if (err) {
            return res.status(500).json({
                ok: false,
                err,
            });
        }
        if (!categoriaDB) {
            return res.status(400).json({
                ok: false,
                err,
            });
        }
        res.json({
            ok: true,
            categoria: categoriaDB,
        });
    });
});

route.put("/categoria/:id", verificaToken, (req, res) => {
    let id = req.params.id;
    let body = req.body;
    let nombreCategoria = {
        nombre: body.nombre,
    };
    Categoria.findByIdAndUpdate(
        id,
        nombreCategoria, { new: true, runValidators: true },
        (err, categoriaDB) => {
            if (err) {
                return res.status(500).json({
                    ok: false,
                    err,
                });
            }
            if (!categoriaDB) {
                return res.status(400).json({
                    ok: false,
                    err: {
                        message: "El id de la categoria no existe",
                    },
                });
            }
            res.json({
                ok: true,
                categoria: categoriaDB,
            });
        }
    );
});

route.delete("/categoria/:id", [verificaToken, isAdmin], (req, res) => {
    let id = req.params.id;
    Categoria.findByIdAndRemove(id, (err, categoriaDB) => {
        if (err) {
            return res.status(500).json({
                ok: false,
                err,
            });
        }
        if (!categoriaDB) {
            return res.status(400).json({
                ok: false,
                err: {
                    message: "El id de la categoria no existe",
                },
            });
        }
        res.json({
            ok: true,
            categoria: categoriaDB,
        });
    });
});

module.exports = route;