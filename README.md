# EstudoNodeJs
Estudo NodeJs - Estrutura MVC Básica 

> Estudo projeto foi criado para auxiliar no estudo de NodeJs

> Ele não tem validações ou algo do tipo, é apenas um fluxo básico ( da url ao banco )


### Como começar ?
  - Execute este comando no terminal dentro da pasta aonde se encontra o arquivo `package.json`
```sh
$ npm install
```
  Automaticamente irá instalar todos os modulos usado neste exemplo

  - Será necessário a instalação do MongoDB
    
    Para [Ubuntu 16](https://www.digitalocean.com/community/tutorials/how-to-install-mongodb-on-ubuntu-16-04)  
    
    Para [Ubuntu 14](https://www.digitalocean.com/community/tutorials/how-to-install-mongodb-on-ubuntu-14-04)
    
    Comandos do [MongoDB](http://imasters.com.br/artigo/20828/mongodb/como-usar-o-console-do-mongodb?trace=1519021197&source=single)
    
  - Neste exemplo dei o nome do banco de ***MVC*** , as configurações você pode acompanhar no arquivo `app.js`
    
```sh    
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
  - Algumas partes do código estão com comentários para explicar melhor o que cada item faz ou como funciona.
  
  - Neste exemplo só ha dois itens: Home e Usuarios
      - Home: Pagina inical sem segredos
      - Usuarios: 
      
            - Em Usuarios nós vamos da requisição via http para Route
          
            - De Route para o Controller
          
            - Do Controller para o Banco MongoDB
          
      - As regras de negócio você vai encontrar no Controller
      
### Por fim ...
  - Para executar a aplicação, em seu console sempre mande o comando nodemon 
  - Exemplo:
      
      ```sh
        $ nodemon app.js
      ```
  

