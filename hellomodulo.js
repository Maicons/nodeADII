 
 var hello1 = function(){
     console.log('......');
     console.log('Hello 1');
     console.log('......');
 }
 
 var hello2 = function(){
     console.log('......');
     console.log('Hello 2');
     console.log('......');
 }

 var calcArea = function(a,b){
    return a*b;
}


class Cat {
    makeSound() {
      return 'Meowww';
    }
  }

var soma = function(a ,b){
    var inputvalue1 = parseInt(a),
        inputvalue2 = parseInt(b);
    return inputvalue1+inputvalue2;
}


 
//expõe os módulos
module.exports = {
    helloExemplo1:hello1,
    helloExemplo2:hello2,
    calculaArea:calcArea,
    Gato:Cat,
    calcSoma: soma

}