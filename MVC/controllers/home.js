module.exports = function (app) {

    var validacaoDadosIniciais = require('../validacoes/autentication');
    var Usuario = app.models.usuario;

    var HomeController = {
        index: function (req, res) {
            res.render('home/index');
        },
        login: function (req, res) {
            res.render('home/login');
        },
        autenticar: function (req, res) {

            var usuario = new Usuario();

            if (validacaoDadosIniciais(req, res)) {
                if (req.body.email == 'admin@admin.com' && req.body.password == 'admin123') {
                    req.session.usuario = {
                        nome: "Admin",
                        email: "admin@admin",
                        senha: "admin123"
                    };
                    res.redirect("/home");

                } else {
                    Usuario.findOne({
                            'email': req.body.email
                        },
                        function (err, data) {
                            if (err) {
                                console.log("Erro ao tentar se logar no sistema " + err);
                                res.redirect("/");
                                // se os dados voltados foram nulos   
                            } else if (!data) {
                                console.log("Email não encontrado ");
                                res.redirect("/");
                            } else if (!usuario.validPassword(req.body.password, data.password)) {
                                console.log("Senha incorreta ");
                                res.redirect("/");
                            } else {
                                req.session.usuario = data;
                                res.redirect("/home");
                            }

                        });
                }
            } else {
                res.redirect("/");
            }
        },

        logout: function (req, res) {
            req.session.destroy();
            res.redirect("/");
        }

    }
    return HomeController;
}