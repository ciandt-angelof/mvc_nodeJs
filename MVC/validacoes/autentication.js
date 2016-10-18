module.exports = function (req, res) {

    console.log(" ");
    console.log("CHEGOU: " + req.body.email);
    console.log("CHEGOU: " + req.body.password);
    console.log(" ");

    req.assert('email', 'E-mail inválido ').isEmail();
    req.assert('password', 'Sua senha deve conter de 6 a 10 caracteres ').len(6, 10);

    var validateErros = req.validationErrors() || [];

    if (validateErros.length > 0) {
        
        validateErros.forEach(function (e) {
            req.flash('erro', e.msg);
        });

        for (var x = 0; x < validateErros.length; x++) {
            console.log(" ");
            console.log("ERRO: " + validateErros[x].msg);
            console.log(" ");
        }

        return false;
        
    }
    
    return true;

}