//Import dos modulos do mongoose (banco de dados) e bcrypt(criptografador)
var mongoose = require('mongoose');
var bcrypt = require('bcrypt-nodejs');

module.exports = function () {
    var usuarioSchema = mongoose.Schema({
        nome        : { type: String, trim: true },
        email       : { type: String, trim: true },
        password    : { type: String, trim: true },
        site        : { type: String, trim: true },
        data_cad    : { type: Date, default: Date.now }
    });

    // método para gerar a senha criptografada
    usuarioSchema.methods.generateHash = function (password) {
        return bcrypt.hashSync(password, bcrypt.genSaltSync(8), null);
    };

    return mongoose.model('Usuarios', usuarioSchema);
}