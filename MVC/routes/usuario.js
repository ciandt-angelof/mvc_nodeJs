module.exports = function (app) {

    //comandos usado no http ---> GET POST PUT(UPDATE) DELETE
    var autenticar = require('../middleware/autenticar');

    var usuario = app.controllers.usuario;
    // rota chamando o metodo index
    app.route('/usuario').get(autenticar, usuario.index);

    // rota para o metodo create se a chamada for um GET ou para o metodo post se houver um submit do form
    app.route('/usuario/create').get(autenticar, usuario.create).post(usuario.post);

    // rota para o metodo show passando o id na url
    app.route('/usuario/get/:id').get(autenticar, usuario.get);

    // rota para o metodo delete passando o id na url
    app.route('/usuario/delete/:id').post(usuario.delete);
    //tentei usar o método delete na chamada mas por algum motivo ele não consegue executar
    //app.route('/usuario/delete/:id').delete(usuario.delete);

    // // rota para o metodo edit passando o id na url ou para o metodo update se houver um submit do form
    app.route('/usuario/edit/:id').get(autenticar, usuario.edit).post(usuario.update);

}