const express = require("express");
const app = express();
const bodyParser = require("body-parser");
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());



app.get("/Ejercicio1", (req, res) => {
  //Se parsea a numero el valor que se recibe
  let numDecimal=parseInt(req.query.numero);
  //Se convierte el numero decimal a binario
  let numBinario=numDecimal.toString(2);
  //Se crea una condicion para que el numero no pase de 32 bits
  if(numBinario.length>32){
    res.send({sucess: false, mensaje:"Numero muy grande"});
    return;
  }
  //Se sacan los bits que faltan para completar los 32bits
  let bitsFaltantes=32-numBinario.length;
  //Se rellena con ceros a la izquierda
  for(let i=0; i<bitsFaltantes; i++){
    numBinario="0"+numBinario;
  }

  let direccion="";
  //El numero binario se divide en octetos a a su ves que cada octeto se se convierte a decimal
  //y se va concatenando para crear la direccion IPv4
  for(let i=0; i<4; i++){
    direccion=direccion+"."+parseInt(numBinario.substr(i*8,8), 2);
  }
  //Se quita el punto incial
  direccion=direccion.slice(1,direccion.length);
  //Se manda la respuesta
  res.send({sucess: true, direccion});
});


app.get("/Ejercicio2", (req, res) => {
  //Se parsea a entero el valor que llega
  let numero=parseInt(req.query.numero);
  //Se parsea a array el string que llega
  let elementos=JSON.parse(req.query.cadena);
  let n1=0;
  let n2=0;
  //Se inicializa en infinito para que la primera longitud comparada siempre sea menor
  let espacio=Number.POSITIVE_INFINITY;

  //Los Fors son para ir recorriendo el array e ir sumando 
  //el elemento en la posicion i mas el elemento en la posicion j
  for(let i=0; i<elementos.length; i++){
    for(let j=i+1; j<elementos.length; j++){
      //Se compara si la suma es igual al numero ingresado
      if(elementos[i]+elementos[j]==numero){
        //Se compara si el espacio entre los dos numeros 
        //es menor al espacio del anterior par de numeros
        if(j-i<espacio){
          //Se guarda el nuevo par de numeros y se actualiza el espacio
          n1=elementos[i];
          n2=elementos[j];
          espacio=j-i;
        }
      }    
    }
  }
  //Si ningun par de numeros suman el numero ingresado se devulve null
  if(espacio==Number.POSITIVE_INFINITY){
    res.send({sucess: true, mensaje:null});
    return;
  }
  //Se devulve el par de numeros 
  res.send({sucess: true, mensaje:[n1,n2] });
});



// set port, listen for requests
const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}.`);
});