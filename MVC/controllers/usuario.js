module.exports = function (app) {

    var validacaoDadosUsuario = require('../validacoes/usuario');

    // instancia da model usuario
    var Usuario = app.models.usuario;

    var UsuarioController = {
        index: function (req, res) {
            Usuario.find(function (err, dados) {
                if (err) {
                    console.log(" ");
                    console.log("Erro ao buscar os usuários !");
                    console.log(" ");
                    res.redirect('/usuario');
                } else {
                    //Fiz este for apenas para ver o que estava vindo de informação em "DADOS"
                    //No console você pode verificar
                    for (var x in dados) {
                        console.log(" ");
                        console.log("DADO ----------------------> " + dados[x].nome);
                        console.log("DADO ----------------------> " + dados[x].email);
                        console.log(" ");
                    }
                    res.render('usuario/index', {
                        lista: dados
                    })
                }
            })

        },
        create: function (req, res) {
            res.render('usuario/create', {
                user: new Usuario()
            });
        },
        post: function (req, res) {
            if (validacaoDadosUsuario(req, res)) {
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

                /**Por que não uso o metodo FindoOne no arquivo de validações ?
                 * Se caso esse metodo estivesse la , assim que entrar nele , 
                 * o node iria entrar nele e continuar suas validações( fluxo assincrono )
                 * ou seja o erro do email nunca seria mostrado !
                 */
                Usuario.findOne({
                    'email': usuario.email
                }, function (err, data) {
                    // Se caso encontra um cadastro com o email informado não deixa cadastrar
                    if (data) {
                        console.log(" ");
                        console.log("ESTE E-MAIL JA FOI CADASTRADO");
                        console.log(" ");
                        res.render('usuario/create', {
                            user: req.body
                        });
                        //Se não, cadastra o novo usuario
                    } else {
                        // o metodo save é um metodo do mongoose
                        usuario.save(function (err) {
                            if (err) {
                                req.flash('erro', 'Erro ao cadastrar usuario: ' + err);
                                console.log("ERRO AO SALVAR USUARIO")
                                // este render devolve os dados digitados na tela se casou houver um erro na hora de salvar
                                res.render('usuario/create', {
                                    user: req.body
                                });
                            } else {
                                req.flash('info', 'Registro cadastrado com sucesso !');
                                console.log("USUARIO SALVO COM SUCESSO !")
                                res.redirect('/usuario');
                            }
                        });
                    }
                });

            } else {
                res.render('usuario/create', {
                    user: req.body
                });
            }
        },
        get: function (req, res) {
            // o metodo findById é um metodo do mongoose
            Usuario.findById(req.params.id, function (err, dados) {
                if (err) {
                    console.log("ERRO AO EXIBIR OS USUARIOS");
                    res.redirect('/usuario');
                } else {
                    console.log("EXIBINDO OS USUARIOS EM ---> " + "http://localhost:3000/usuario/");
                    res.render('usuario/show', {
                        dados: dados
                    });
                }
            });
        },
        delete: function (req, res) {
            // o metodo remove é um metodo do mongoose  
            Usuario.remove({
                _id: req.params.id
            }, function (err) {
                if (err) {
                    console.log("ERRO AO EXCLUIR ");
                    res.redirect('/usuario');
                } else {
                    console.log("USUARIO DELETADO COM SUCESSO ");
                    res.redirect('/usuario');
                }
            })
        },
        edit: function (req, res) {
            // o metodo findById é um metodo do mongoose
            Usuario.findById(req.params.id, function (err, dados) {
                if (err) {
                    console.log("ERRO AO BUSCAR O USUARIO");
                    res.redirect('/usuario');
                } else {
                    console.log("USUARIO ENCONTRADO COM SUCESSO");
                    console.log(dados);
                    res.render('usuario/edit', {
                        dados: dados
                    });
                }
            });
        },
        update: function (req, res) {
            if (validacaoDadosUsuario(req, res)) {

                //passo para usuario os dados da requisição
                var usuario = new Usuario(req.body);

                console.log(" ");
                console.log("Dados do usuario para atualizar");
                console.log(usuario.nome);
                console.log(usuario.site);
                console.log(usuario.id);
                console.log(req.params.id);
                console.log(" ");
                // o metodo findById é um metodo do mongoose
                Usuario.findById(req.params.id, function (err, dados) {

                    console.log(" ");
                    console.log("ERRO ---> " + err);
                    console.log("Encontrou ---> " + dados);
                    console.log(" ");

                    if (dados) {
                        // atualizo a variavel usuarioEncontrado com os dados encontrados do banco
                        var usuarioEncontrado = dados;
                        usuarioEncontrado.nome = req.body.nome;
                        usuarioEncontrado.site = req.body.site;
                        usuarioEncontrado.email = req.body.email;

                        //Atualizando os dados do usuario
                        usuarioEncontrado.save(function (err) {
                            if (err) {
                                //req.flash('erro', 'Erro ao cadastrar usuario: ' + err);
                                console.log("ERRO AO ATUALIZAR O USUARIO");
                                console.log("ERRO: ---> " + err);
                                res.render('usuario/edit', {
                                    user: req.body
                                });
                            } else {
                                //req.flash('info', 'Registro cadastrado com sucesso !');
                                console.log("USUARIO ATUALIZADO COM SUCESSO")
                                res.redirect('/usuario');
                            }

                        });
                    } else {
                        console.log(" ");
                        console.log("Não encontrou nenhum dado");
                        console.log(" ");
                    }
                });
            } else {
                res.render('usuario/edit', {
                    user: req.body
                });
            }

        }
    }
    return UsuarioController;
}