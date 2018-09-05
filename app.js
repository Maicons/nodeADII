var express = require('express');
var bodyParser=require('body-parser');
var cookieParser=require('cookie-parser');
var session=require('express-session');
var path = require('path');
var config=require('./src/config/config');
var exphbs  = require('express-handlebars'); //templates


var app = express();
var http = require('http');


const PORT=8080;

//onde ficarão os js,css
app.use(express.static("public"));

//onde ficarão os htmls
app.set('views','src/views');

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(cookieParser());


//definne a extensão do template
app.engine('.hbs', exphbs({extname: '.hbs'
                                                    
}));

//engine template
app.set('view engine', '.hbs');


//quando entrar pela primeira vez em http://localhost:8080/
app.get('/', function (req, res) {
     //limpar a sessão
     session.loginUsuario=null;
     
    console.log('acessando login');    
    res.render("login",{erro:session.erro});
}) 

//quando acionar o botão "Entrar", usando metodo post
app.post('/login', function (req, res) {
    var login=req.body.login;
    var senha=req.body.senha;

    session.erro=null;
    
    console.log("O usuario e:"+login)

    if (login=='admin' && senha=='123'){
        //armazena em uma variável de sessão. Somente será destruida com a sessão fechar
        //pode-se usar qualquer nome.. session.nomeVariavel.
        session.loginUsuario=login;
        //console.log(produtos);
        //usuarioLogado é a variavel, session.loginUsuario é o valor dela
        //obs: se entrar em main.hbs, observe a variavel {{userLogado}}. É onde será renderizado
        //main se referencia ao arquivo main.hbs que está dentro da pasta src/views
        
        session.tabelaProdutosFixa=tabelaProdutos; //gravo na seção

        res.render('main',{userLogado:session.loginUsuario,
                           tabelaProdutos:session.tabelaProdutosFixa});

        
        
    }else {
        //limpar a sessão
        session.erro="Login invalido!!";
        session.loginUsuario=null;
        //redireciona para a rota /
         res.redirect("/");
    }
    
})  

// tela de cadastro de produtos

app.post('/cadastro', function(req,res){
    res.render("cadastro");
    
})

// incluir novo produto

app.post('/incluir', function(req,res){
    
    var produtoNovo = {
        "codigo": req.body.edtCodigo,
        "descricao": req.body.edtDescricao,
        "un": req.body.edtUn
        };
        tabelaProdutos.produto.push(produtoNovo);
        session.tabelaProdutosFixa = tabelaProdutos;

    res.render('main',{userLogado:session.loginUsuario,
        tabelaProdutos:session.tabelaProdutosFixa})
})


// cancelar cadastro

app.post('/cancelar', function(req,res){
    res.render('main',{userLogado:session.loginUsuario,
        tabelaProdutos:session.tabelaProdutosFixa});
})

// alterar cadastro

app.get('/alterar/:codigo', function(req,res){
    var edtCodigo = "";
    var edtDescricao = "";
    var edtUn = "";

    for(var i=0; i <= (tabelaProdutos.produto.length -1); i++){
        console.log(tabelaProdutos.produto[i].codigo);
        if ( req.params.codigo == tabelaProdutos.produto[i].codigo) {
            console.log('Achou');            
            edtCodigo = tabelaProdutos.produto[i].codigo;
            edtDescricao = tabelaProdutos.produto[i].descricao;
            edtUn = tabelaProdutos.produto[i].un;
            break;           
        } else {

            console.log('ERROOOOOUUU');
            
        } 
    }
            console.log(edtCodigo);
            console.log(edtDescricao);
            console.log(edtUn);
    res.render('cadastro', {codigo: edtCodigo,descricao: edtDescricao, un:edtUn});
    
    

})
//quando clicar em "calcular" encaminha para essa rota via POST
app.post('/calcular', function (req, res) {
    console.log('Calculando......');
    
    var valor1=req.body.valor1;
    var valor2=req.body.valor2;

    //calcula a soma e joga para variável
    var resultadoOperacao=funcaoSoma(valor1,valor2);

    
    
   //renderiza o resultado no campo
   //as varias estão dentro de main.hbs escritas entre {{}}
   res.render("main",{userLogado:session.loginUsuario,
                      resultado:resultadoOperacao,
                      valor1:valor1,
                      valor2:valor2 
                    }
             );
}) 

 


//o usuário clicar em sair
app.post('/sair', function (req, res) {
    //limpar a sessão
    session.loginUsuario=null;
    
    console.log('Saindo....');

   //redireciona para a rota /
   res.redirect("/");
}) 




//soma 2 numeros
var funcaoSoma=function(a,b){
    return parseInt(a)+parseInt(b);
}


//json
var tabelaProdutos={    
        produto: [
          {codigo: "45586", descricao: "Massas e Marca X",un:"PC"},
          {codigo: "45587", descricao: "Refrigente Cola",un:"LT"},
          {codigo: "45588", descricao: "Agua mineral",un:"LT"},
          {codigo: "45589", descricao: "Manteiga XX",un:"PT"}                    
        ]      
}









//servidor
app.listen(PORT,function(err){  
    console.log('Servidor rodando em:'+PORT);
    
});