var express   = require('express');
var app       = express();
const path    = require("path");
var helloModulo = require('./hellomodulo');

var bodyParser = require('body-parser');
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended:false}));


app.get('/', function (req, res) {
    res.send('Hello World');
  });


app.get('/login', function (req, res) {
  console.log(helloModulo.calcSoma(req.query.inputA,req.query.inputB));
  res.sendFile(path.join(__dirname+'/login.html'));
});

app.post('/calcular', function (req, res) {
  res.send('O resultado e:' +helloModulo.calcSoma(req.body.inputA,req.body.inputB));
});


app.listen(3000, function () {
  console.log('Example app listening on port 3000!');
});


//referencia o módulo

var helloModulo = require('./hellomodulo');


 
helloModulo.helloExemplo1();

helloModulo.helloExemplo2();

console.log("Valor da área é:"+helloModulo.calculaArea(50,10))


var gato=new helloModulo.Gato();

console.log('Gato :'+gato.makeSound());