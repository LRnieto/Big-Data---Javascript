var operacion = "", item, valorActual = 0, operando1, operando2, total;

var Eventos = {
  
  init: function(){
	
    this.eventosTeclas('boton-accion');
	document.getElementById("display").maxLength = 8;
  },
	
  limpiarDatos:function(){
	operando1 = undefined;
	operando2 = undefined;
	item = "";
	operacion = undefined;
	total = undefined;
	valorActual = undefined;
	document.getElementById("display").textContent = 0;
  },

  calcularResultado: function(op1, op2, operacion){
	
	if(op1 < 0){
		op1 = "(" + op1 + ")"
	}
	
	if(op2 < 0){
		op2 = "(" + op2 + ")"
	}
	  
	total = eval(op1 + operacion + op2);
	  
	valorActual = "";  
    Eventos.asignarValorDisplay(total.toPrecision(5));	
	  
  },
	
  asignarValorDisplay: function(valor){
	  var numero;
	  if(valor != 0){
		 numero = valor.substring(0,8);  
	  } else {
		 if(valor.toString() == "0."){
			numero = "0.";
		 } else {
			numero = 0;	 
		 }
		 
	  }
	  
      
	  document.getElementById("display").innerHTML = numero;
  
  },

  asignarPrimerValor: function(valor){

	operando1 = valor;
	operando2 = undefined;
	valorActual = 0;
	Eventos.asignarValorDisplay(0);	
	  
  },
	
  eventosTeclas: function(){
    
	var teclas = document.querySelectorAll("[class^='tecla']");
    for (var i = 0; i < teclas.length; i++) {
      teclas[i].onclick = this.teclaPresionada;
    }
	  
  },
	
	
  teclaPresionada: function(e){ 
	  
	e.preventDefault();
	e.stopImmediatePropagation();
	  
	var tecla = document.getElementById(e.target.id);
	var display = document.getElementById("display");
	//var operacion = "", item, valorActual = 0, operando1, operando2, total;
	var anchoOrig = tecla.width;
	var altoOrig = tecla.height;  
    
	/*tecla.style.height = altoOrig * 0.98 + "px";
    tecla.style.width = anchoOrig * 0.98 + "px";*/
	 tecla.style.cssText = "transform: scale(0.9)";

	valorActual = display.textContent;
	
	// Verificamos si el usuario requiere una operación o sólo modifica el número
	
	switch (tecla.id) {

		case "on":
			operacion = "ON";
			Eventos.limpiarDatos();
			break;

		case "raiz":
			operacion = "raiz";
			break;

		case "igual":
			if(operando1 && operando1 != 0){
				if(!total){
					if(total != 0){
						total = operando1;	
					}
				}
				if(!operando2){
					operando2 = valorActual;
					valorActual = 0;
					Eventos.asignarValorDisplay(0);	
				}
				Eventos.calcularResultado(total, operando2, operacion);
			}
			break;

		case "punto":
			var esDecimal = display.textContent.indexOf(".",-1);
			if (esDecimal <= 0){
				valorActual += ".";
				Eventos.asignarValorDisplay(valorActual);	
			}
			break;

		case "mas":
			Eventos.asignarPrimerValor(valorActual);
			operacion = "+";
			break;

		case "menos":
			Eventos.asignarPrimerValor(valorActual);
			operacion = "-";
			break;

		case "por":
			Eventos.asignarPrimerValor(valorActual); 
			operacion = "*";
			break;

		case "dividido":
			Eventos.asignarPrimerValor(valorActual);
			operacion = "/";
			break;

		case "sign":
			valorActual = valorActual * -1;
			display.textContent = valorActual;
			break;

		default:
			if(tecla.id != 0) {
				if(valorActual != 0){
					valorActual += tecla.id;	
				} else {
					if(valorActual == "0."){
						valorActual += tecla.id;
					} else {
						valorActual = tecla.id;	
					}
				}
			} else {
				if(valorActual == 0){
					valorActual = 0;	
				} else {
					valorActual += tecla.id;	
				}
			}
			
			Eventos.asignarValorDisplay(valorActual);
			break; 
	}
	
	  
 
	  

	
	
	// Realizamos el efecto de click sobre la tecla presionada
	function tamanoNormal(anchoOrig, altoOrig){
		/*tecla.style.height = altoOrig + "px";
		tecla.style.width = anchoOrig + "px";	*/
		tecla.style.cssText = "transform: scale(1)";
		
	} 
	  
	setTimeout(tamanoNormal, 100);
	/*setTimeout(tamanoNormal, 300, anchoOrig, altoOrig);*/
	 
  }
	
  

}

Eventos.init();
