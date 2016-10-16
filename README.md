# EstudoNodeJs
Estudo NodeJs - Estrutura MVC Básica 

## Sobre o projeto
 
> Este projeto foi criado para auxiliar no estudo de NodeJs

> Ele não tem validações ou algo do tipo, é apenas um fluxo básico ( da url ao banco )

> Não se preocupe com os layouts nele , se caso você tiver dúvida de como foi colocado vá na pasta `public`. 

> Ele já esta SALVANDO / EDITANDO / BUSCANDO / DELETANDO

> Usei o [Bootstrap](http://getbootstrap.com/) como template.

### Como começar ?
  - Execute este comando no terminal dentro da pasta aonde se encontra o arquivo `package.json`
```sh
$ npm install
```
  Automaticamente irá instalar todos os modulos usado neste exemplo

### Qual banco foi usado ?
  - Será necessário a instalação do MongoDB
    
    Para [Ubuntu 16](https://www.digitalocean.com/community/tutorials/how-to-install-mongodb-on-ubuntu-16-04)  
    
    Para [Ubuntu 14](https://www.digitalocean.com/community/tutorials/how-to-install-mongodb-on-ubuntu-14-04)
    
    Comandos do [MongoDB](http://imasters.com.br/artigo/20828/mongodb/como-usar-o-console-do-mongodb?trace=1519021197&source=single)
    
  - Neste exemplo dei o nome do banco de ***MVC*** , as configurações você pode acompanhar no arquivo `app.js`
  - Não há usuario e nem senha
    
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
          
            - Do Controller (usando uma Model) para o Banco MongoDB
          
      - As regras de negócio você vai encontrar no Controller

### Que modulos há neste projeto ?
  - bcrypt-nodejs: Criptografar senhas
  
  - body-parser: Usado para formulários
  
  - cookie-parser: Para cookies
  
  - debug: Para debug 
    
  - express: Framework para nosso app web
  
  - express-flash: Mensagens na tela
  
  - express-load: Carregamento de todos os controllers , routes e models
  
  - jade: Template das telas
  
  - moment: Formatadpr de data
  
  - mongoose: Comandos para o BD
  
  - morgan: Para log
  
  - serve-favicon: Para o icone na guia
  
  - session: Para senha
  
### Algo que vale ressaltar ?
  - Sim ! 
  - Durante o estudo achei bem interessante o uso do nodemon, que faz com que não precisamos parar nossa aplicação, ele da um restart já no comando do ctrl + s 
  - E do express-load que carrega nossos controllers , models e routes.
  
  - Linha de código que carrega os arquivos, ja setando quem sera a pagina inicial e assim por diante. ---> `app.js`
    
     
      ```sh
        load('models').then('controllers').then('routes').into(app);
      ```
      
      - a pagina inicial é setada em quem tiver como route o caminho `('/')`
  
  
  
### Não tenho um cadastro e agora ?!
 - Segue um email e senha padrão ;)
```sh
        email: admin@admin.com
        senha: admin123
```  

### Por fim ...
  - Para executar a aplicação, em seu console sempre mande o comando nodemon 
  - Exemplo:
      
      ```sh
        $ nodemon app.js
      ``` 
  - chame essa URL: https://localhost:3000
  

