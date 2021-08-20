const mongoose = require("mongoose");
const uniqueValidator = require("mongoose-unique-validator");
let Schema = mongoose.Schema;

let rolesValidos = {
    values: ["ADMIN_ROLE", "USER_ROLE"],
    message: "{VALUE} no es un rol valido",
};

let usuarioSchema = new Schema({
    nombre: {
        type: String,
        require: [true, "El nombre es necesario"],
    },
    email: {
        type: String,
        unique: true,
        require: [true, "El correo es necesario"],
    },
    password: {
        type: String,
        require: [true, "La contraseña es obligatoria"],
    },
    img: {
        type: String,
        require: false,
    },
    role: {
        type: String,
        default: "USER_ROLE",
        enum: rolesValidos,
    },
    estado: {
        type: Boolean,
        default: true,
    },
    google: {
        type: Boolean,
        default: false,
    },
});

usuarioSchema.methods.toJSON = function() {
    let user = this;
    let userObject = user.toObject();
    delete userObject.password;
    return userObject;
};

usuarioSchema.plugin(uniqueValidator, { message: "{PATH} debe ser unico" });

module.exports = mongoose.model("Usuario", usuarioSchema);