# EstudoNodeJs
Estudo NodeJs - Estrutura MVC Básica 

> Estudo projeto foi criado para auxiliar no estudo deNodeJs
> Ele não tem validações ou algo do tipo. É apenas um fluxo básico ( da url ao banco )
> Na Issues você pode acompanhar o que esta pendendo e pode ser feito.

### Como começar ?
  - Execute este comando no terminal dentro da pasta aonde se encontra o arquivo `package.json`
```sh
$ npm install
```
  Automaticamente irá instalar todos os modulos usado neste exemplo

  - Será necessário a instalação do MongoDB
    
    Para [Ubuntu 16](https://www.digitalocean.com/community/tutorials/how-to-install-mongodb-on-ubuntu-16-04)   
    Para [Ubuntu 14](https://www.digitalocean.com/community/tutorials/how-to-install-mongodb-on-ubuntu-14-04)
    
  - Comandos do [MongoDB](http://imasters.com.br/artigo/20828/mongodb/como-usar-o-console-do-mongodb?trace=1519021197&source=single)
    
    Neste exemplo dei o nome do banco de MVC , as configurações você pode acompanhar no arquivo `app.js`
```sh    
//so pode ser executado se o express-load estiver instalado
//deve estar antes da inicialização do app
load('models').then('controllers').then('routes').into(app);

// Conexao com o MongoDB
mongoose.Promise = global.Promise;
mongoose.connect('mongodb://localhost/MVC', function(err){
  if(err){
    console.log("Erro ao conectar ao banco: " + err)
  }else{
    console.log("Conexão estabelecida com sucesso !")
  }
})
```
