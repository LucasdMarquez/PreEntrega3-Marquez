
let servicios = {
    "corte": 15.00,
    "tintura": 35.00,
    "peinado": 25.00,
    "lavado": 10.00
  };
  
  let costoTotal = 0;
  let seguirAgregando = true;
  
  function agregarServicio() {
    
    let listaServicios = "Elige un servicio:\n";
    for (let servicio in servicios) {
      listaServicios += servicio + " ($" + servicios[servicio].toFixed(2) + ")\n";
    }
    
    let eleccion = prompt(listaServicios);
    if (servicios[eleccion.toLowerCase()]) {
      costoTotal += servicios[eleccion.toLowerCase()]; 
    } else {
      alert("Por favor, selecciona un servicio válido de la lista.");
    }
  
    let respuesta = prompt("¿Quieres añadir otro servicio? (sí/no)");
    if (respuesta.toLowerCase() === "no") {
      seguirAgregando = false;
    }
  }
  
  while (seguirAgregando) {
    agregarServicio();
  }
  
  alert("El costo total es $" + costoTotal.toFixed(2));
  