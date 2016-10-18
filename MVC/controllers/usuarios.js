module.exports = function (app) {

    // instancia da model usuarios 
    var Usuario = app.models.usuarios;

    var UsuarioController = {
        index: function (req, res) {
            Usuario.find(function (err, dados) {
                if (err) {
                    console.log(" ");
                    console.log("Erro ao buscar os usuários !");
                    console.log(" ");
                    res.redirect('/usuarios');
                }
                else {
                    //Fiz este for apenas para ver o que estava vindo de informação em "DADOS"
                    //No console você pode verificar
                    for (var x in dados) {
                        console.log(" ");
                        console.log("DADO ----------------------> " + dados[x].nome);
                        console.log("DADO ----------------------> " + dados[x].email);
                        console.log(" ");
                    }
                    res.render('usuarios/index', { lista: dados })
                }
            })

        },
        create: function (req, res) {
            res.render('usuarios/create')
        },
        post: function (req, res) {
            // Esta linha passa o objeto Usuario em vez de atributo por atributo
            var usuario = new Usuario(req.body);

            // Se caso quisermos passar atributo por atributo devemos fazer desta maneira
            // var usuario       = new Usuario();
            // usuario.nome      = req.body.nome;
            // usuario.email     = req.body.email;
            // usuario.site      = req.body.site;

            // para a senha eu salvo ela criptografando
            // este metodo generateHash esta na classe da model usuario e usa o modulo bcrypt-nodejs
            usuario.password = usuario.generateHash(req.body.password);

            // o metodo save é um metodo do mongoose
            usuario.save(function (err) {
                if (err) {
                    //req.flash('erro', 'Erro ao cadastrar usuario: ' + err);
                    console.log("ERRO AO SALVAR USUARIO")
                    // este render devolve os dados digitados na tela se casou houver um erro na hora de salvar
                    res.render('usuarios/create', { user: req.body });
                } else {
                    //req.flash('info', 'Registro cadastrado com sucesso !');
                    console.log("USUARIO SALVO COM SUCESSO !")
                    res.redirect('/usuarios');
                }

            });
        },
        show: function (req, res) {
            // o metodo findById é um metodo do mongoose
            Usuario.findById(req.params.id, function (err, dados) {
                if (err) {
                    console.log("ERRO AO EXIBIR OS USUARIOS");
                    res.redirect('/usuarios');
                } else {
                    console.log("EXIBINDO OS USUARIOS EM ---> " + "http://localhost:3000/usuarios/");
                    res.render('usuarios/show', { dados: dados });
                }
            });
        },
        delete: function (req, res) {
            // o metodo remove é um metodo do mongoose  
            Usuario.remove({ _id: req.params.id }, function (err) {
                if (err) {
                    console.log("ERRO AO EXCLUIR ");
                    res.redirect('/usuarios');
                } else {
                    console.log("USUARIO DELETADO COM SUCESSO ");
                    res.redirect('/usuarios');
                }
            })
        },
        edit: function (req, res) {
            // o metodo findById é um metodo do mongoose
            Usuario.findById(req.params.id, function (err, dados) {
                if (err) {
                    console.log("ERRO AO EDITAR O USUARIO");
                    res.redirect('/usuarios');
                } else {
                    console.log("USUARIO EDITADO COM SUCESSO");
                    res.render('usuarios/edit', { dados: dados });
                }
            });
        },
        update: function (req, res) {
            // o metodo findById é um metodo do mongoose
            Usuario.findById(req.params.id, function (err, dados) {
                // neste metodo recebo primeiro os dados do metodo findById 
                // e atualizo o objeto com os dados vindo da requisição
                var usuario = dados;
                usuario.nome    = req.body.nome;
                usuario.site    = req.body.site;
                usuario.email   = req.body.email;

                usuario.save(function (err) {
                    if (err) {
                        //req.flash('erro', 'Erro ao cadastrar usuario: ' + err);
                        console.log("ERRO AO ATUALIZAR O USUARIO")
                        res.render('usuarios/edit', { user: req.body });
                    } else {
                        //req.flash('info', 'Registro cadastrado com sucesso !');
                        console.log("USUARIO ATUALIZADO COM SUCESSO")
                        res.redirect('/usuarios');
                    }

                });
            });

        }
    }
    return UsuarioController;
}