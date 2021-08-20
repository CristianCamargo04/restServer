const mongoose = require("mongoose");
let Schema = mongoose.Schema;

let categoriaSchema = new Schema({
    nombre: {
        type: String,
        require: [true, "El nombre es necesario"],
    },
    usuario: { type: Schema.ObjectId, ref: 'Usuario' },
});

module.exports = mongoose.model("Categoria", categoriaSchema);