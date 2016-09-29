module.exports = function (app) {

    //comandos usado no http ---> GET POST PUT(UPDATE) DELETE

    var usuario = app.controllers.usuarios;
    // rota chamando o metodo index
    app.route('/usuarios').get(usuario.index);
    
    // rota para o metodo create se a chamada for um GET ou para o metodo post se houver um submit do form
    app.route('/usuarios/create').get(usuario.create).post(usuario.post);
    
    // rota para o metodo show passando o id na url
    app.route('/usuarios/show/:id').get(usuario.show);
    
    // rota para o metodo delete passando o id na url
    app.route('/usuarios/delete/:id').post(usuario.delete);
    
    // // rota para o metodo edit passando o id na url ou para o metodo update se houver um submit do form
    app.route('/usuarios/edit/:id').get(usuario.edit).post(usuario.update);
    
}