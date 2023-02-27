'use strict';

// Creación de un controlador que sirve para el botón de tirar dado. Así el jugador no podrá tirarlo más de una vez por turno.
let controlador = false;

// Controlador de las cajas. 
let controladorCajas = false;

// Array de cajas para poder guardar su posición. 
let cajas = [];

// Creación de una función que se encarga de crear el botón "jugar".
function botonJugar()
{
    // Creación del div que contendrá otros dos div llamado "divMayor".
    let divMayor = document.createElement("div");
    divMayor.id = "divMayor";
    document.body.appendChild(divMayor);

    // Creación del primer div, que contendrá el tablero.
    let div1 = document.createElement("div");
    div1.id = "DIV1";

    // Creación del botón "jugar".
    let boton = document.createElement("button");
    boton.id = "botonJugar";
    boton.textContent = "JUGAR";
    boton.disabled = true;

    // Se añade todo a su respectivo div o lugar correspondiente.
    divMayor.appendChild(div1);

    // El botón se añade al body porque los estilos influían en él de manera negativa. 
    document.body.appendChild(boton);

    // Se invoca a la función "tirar dado". Esta función creará un botón llamado como tal.
    tirarDado();

    // Evento de click al botón jugar.
    boton.addEventListener("click", (event)=>{

        // Se obtiene el elemento container. Ya que el botón jugar solo se encontrará dispuesto tras loguearse, justo debajo de la pantalla de login.
        let div = document.getElementById("container");

        // Si el div ya existe, se borra.
        if(div)
        {
            div.remove();
        }

        // Se obtiene el botón tirar dados. 
        let botonD = document.getElementById("botonDado");

        // Y entonces ese botón, que por defecto era invisible, ahora es visible para el usuario ya que se ha logueado correctamente y ha presionado el botón jugar.
        if(botonD)
        {
            botonD.style.visibility = "visible"; 
        }

        // El botón jugar desaparece.
        boton.style = "display: none;"

        

        // Creo las variables 1 y 2 para adjuntarlas como posición inicial hacia la función de generar el tablero.
        let var1 = 0;
        let var2 = 0;
        generarTabla(`${var1}${var2}`);
        
        // Doy una imagen de fondo para el juego.
        document.body.style = "background-image: url('../imagenes/fondo.jpg'); background-size: cover;"
    })
}

// Función que generará la tabla. A esta función se le llama en la anterior.
function generarTabla(posIn)
{
    // Creación de las 3 cajas que tendrán posiciones aleatorias en cada partida.
    let caja1 = Math.floor(Math.random() * 99);
    let caja2 = Math.floor(Math.random() * 99);
    let caja3 = Math.floor(Math.random() * 99);

    // Claramente la posición de ninguna de las cajas puede ser 0 porque es donde comienza el jugador.
    while(caja1 == 0 || caja2 == 0 || caja3 == 0)
    {
        caja1 = Math.floor(Math.random() * 99);
        caja2 = Math.floor(Math.random() * 99);
        caja3 = Math.floor(Math.random() * 99);
    }

    // Se crea la tabla con id tablero. 
    // Y si ya existe, se borra para volver a ser creada con los nuevos parámetros.
    let tablero = document.getElementById("tablero");
    if(tablero)
    {
        tablero.remove();
    }
    
    let div1 = document.getElementById("DIV1");
    let table = document.createElement("table");
    table.border = 1;
    table.id = "tablero";

    // Se setea el atributo posIn que indica en qué posición se encuentra el jugador cada vez que se crea nuevamente la tabla. 
    table.setAttribute("posIn", posIn);

    // Bucle for para realizar 10 casillas en vertical. 
    for(let i = 0; i < 10; i++)
    {
        let tr = document.createElement("tr");
        tr.id = i;

        // Y otro bucle para determinar las casillas horizontales.
        for(let u = 0; u<10; u++)
        {
            // Se crean td's con estilos y que tendrán una id de i+u, por ello irán de 00 hasta 99.
            let td = document.createElement("td");
            td.style = "background-image: url('../imagenes/eps8woq9nh9z.png'); background-size: cover;";
            
            td.id = tr.id + u;

            // Si la id de una td es el mismo número que la posición inicial entonces encima se posiciona la imagen del personaje. 
            if(td.id == posIn)
            {
                
                td.style = "background-image: url('../imagenes/eps8woq9nh9z.png'); background-size: cover;";
                let imagen = document.createElement("img");
                imagen.src = "../imagenes/pj.png";

                // Se le añade una clase para luego ser útil respecto a CSS's. 
                imagen.className = "Gatsu";
                td.appendChild(imagen);

            }
            if(td.id == 99)
            {
                // Si la td.id es 99 entonces se añade la imagen tesoro encima. 
                let imagen = document.createElement("img");
                imagen.src = "../imagenes/tesoro.png";
                td.appendChild(imagen);
            }

            // Si la id es el mismo número que alguna de las cajas entonces se indica que ha de posicionarse encima la imagen de una caja. 
            if(td.id == caja1 || td.id == caja2 || td.id == caja3)
            {

                // Si el controlador de cajas es false entonces entra y crea las cajas. Porque si es true significa que ya están situadas. Así no se crean de nuevo añadiendo nuevas cajas.
                if(controladorCajas == false)
                {
                    let imagen = document.createElement("img");
                    imagen.src = "../imagenes/box.png";
                    imagen.id = "caja" + td.id;
                    td.appendChild(imagen);
                    cajas.push(td);
                    
                }
                
            }

            tr.appendChild(td);

        }
        table.appendChild(tr);
    }
    div1.appendChild(table);
    
    // Se obtienen las casillas sobre las que están situadas las cajas.
    let casilla = document.getElementById(`${cajas[0].id}`);
    let casilla2 = document.getElementById(`${cajas[1].id}`);
    let casilla3 = document.getElementById(`${cajas[2].id}`);
    
    

    // Si controladorCajas es true significa que ha de entrar aquí para irse a la función saberCajas y además detectará si la posición inicial es alguna de las casillas en las que hay cajas.
    if(controladorCajas == true)
    {
        // la función saberCajas se encarga de saber dónde hay cajas cada vez que se carga la tabla. Por eso solo se activa cuando las cajas ya fueron creadas con anterioridad.
        saberCajas();
        if(posIn == cajas[0].id || posIn == cajas[1].id || posIn == cajas[2].id)
        {
            // El botonExtra lo que hace es crear un botón de tirada extra. Esta es una implementación propia.
            let botonExtra = document.createElement("button");
            botonExtra.id = "tiradaExtra";

            // El 1 indica que solo es 1 acumulable. No más.
            botonExtra.textContent = "Tirada extra (1)";

            // Se hace un event listener de un click al botón para que llame a la función que se encarga de tirar dados.
            botonExtra.addEventListener("click", (event)=>{
                
                controlador = false;
                Dado();
                botonExtra.disabled = true;
            })

            let divDer = document.getElementById("DIV2");

            // Si existe ya el botón tirada y ha llegado aquí, entonces se vuelve enabled, ya que por defecto es disabled.
            // Si no existe, lo añade a la pantalla.
            let botonTirada = document.getElementById("tiradaExtra");
            if(botonTirada)
            {
                controlador = false;
                botonTirada.disabled = false;
            }
            else
            {
                divDer.appendChild(botonExtra);
                
            }
            
        }
    }

    // Se crea un elemento que atrapa la imagen que tiene como id "caja+numero de celda" para así poder eliminarla en caso de que el jugador se encuentre encima de ella. 
    // Luego volverá a aparecer la caja, pues el jugador podrá pasar por encima cuando pueda para obtener su tirada.
    let imagen = document.getElementById(`caja` + `${posIn}`);
    
    // Si la imagen existe, la elimina. 
    if(imagen)
    {
        imagen.remove();
        
    }
    
    // Si la posición inicial es 99 entonces se manda un mensaje ganador.
    if(posIn == 99)
    {
        setTimeout(()=>{ 
            alert("ENHORABUENA");
        }, 500)
        
    }

    
    
    // Y controladorCajas pasa a ser true cuando todo acaba, porque así la función saberCajas se activará cuando ya se haya activado esta una vez.
    controladorCajas = true;
    

}

// La función para saber la posición de las cajas.
function saberCajas()
{

    // Se crean 3 casillas y se obtiene la id de los elementos del array de cajas.
    let casilla = document.getElementById(`${cajas[0].id}`);
    let casilla2 = document.getElementById(`${cajas[1].id}`);
    let casilla3 = document.getElementById(`${cajas[2].id}`);
    
    // Entonces se crean imágenes sobre las casillas en cuestión.
    let imagen = document.createElement("img");
    imagen.src = "../imagenes/box.png";
    imagen.id = "caja" + cajas[0].id;
    let imagen2 = document.createElement("img");
    imagen2.src = "../imagenes/box.png";
    imagen2.id = "caja" + cajas[1].id;
    let imagen3 = document.createElement("img");
    imagen3.src = "../imagenes/box.png";
    imagen3.id = "caja" + cajas[2].id;
    casilla.appendChild(imagen);
    casilla2.appendChild(imagen2);
    casilla3.appendChild(imagen3);
    
}

// Función que se encarga del botón tirar dado.
function tirarDado()
{
    // Crea el botón tirar dado y luego le añade un event listener para cuando se le haga click.
    let divMayor = document.getElementById("divMayor");
    let div2 = document.createElement("div");
    div2.id = "DIV2";
    divMayor.appendChild(div2);
    let botonDado = document.createElement("button");
    botonDado.id = "botonDado";
    botonDado.style.visibility = "hidden"; 
    botonDado.textContent = "TIRAR DADO";
    div2.appendChild(botonDado);

    botonDado.addEventListener("click", (event)=>{
        
        // Invoca a la función "Dado()";
        Dado();
    })

}


// La función dado se encarga de generar un número aleatorio que será visualizado como las casillas que el usuario podrá moverse por el tablero.
function Dado()
{
    // Se obtiene el div2, porque es donde aparecerá el número sacado en el dado.
    let div2 = document.getElementById("DIV2");

    // Si el controlador es false entonces entra, porque significa que el dado aún no fue tirado.
    if(controlador == false)
        {
            // Controlador entonces pasa a ser true, para que el usuario ya no pueda entrar a través del botón.
            controlador = true;

            // Se obtiene el h1 del resultado del dado, y si existe se quita.
            let comprobarDado = document.getElementById("tiradaDado");
            if(comprobarDado)
            {
                comprobarDado.remove();
            }

            // Y entonces se crea otro h1 que será el resultado de este Math.random.
            let resultado = Math.floor(Math.random() * 7);
            while(resultado == 0)
            {
                resultado = Math.floor(Math.random() * 7);
            }
            let h1 = document.createElement("h1");
            h1.textContent = resultado;
            h1.id = "tiradaDado";
            div2.appendChild(h1);

            // Se le pasa el resultado a la función "Casillas(resultado)".
            Casillas(resultado);
        }
}


// Función casillas, que sirve para que el usuario sepa qué casillas puede moverse y pasar su personaje a una de ellas con un click.
function Casillas(resultado)
{
    // Se crean dos for, como a la hora de la creación de la tabla, pues estamos trabajando de la misma manera, como si fuese un array bidimensional.
    for(let i = 0; i < 10; i++)
    {
        for(let j = 0; j < 10; j++)
        {
            // Entonces obtengo tablero mediante su id para poder obtener su atributo posIn, que es la casilla donde se encuentra el jugador.
            let tablero = document.getElementById("tablero");
            let posicion = tablero.getAttribute("posIn");
            
            // Si posición es igual a i+j.
            if(`${i}${j}` == posicion)
            {
                // Entonces obtenemos las 4 casillas hacia las que el usuario se puede mover. 
                // Claramente estas casillas no solo son i+j sino que habrá 4 vectores; sumando el resultado a i, sumando el resultado a j, restando este a i y restando este a j.
                
                let casilla = document.getElementById(`${i+resultado}${j}`);
                
                let casilla2 = document.getElementById(`${i}${j+resultado}`);
                

                let casilla3 = document.getElementById(`${i-resultado}${j}`);
                
                let casilla4 = document.getElementById(`${i}${j-resultado}`);
                
                // Y entonces controlo los errores. Porque si alguna de esas casillas es null no debe existir su destino.
                // Si son distintas de null, se añade un event listener de click y se colorean en rojo para indicarle al usuario que puede moverse a ella :)

                if(casilla !== null)
                {
                    casilla.style = "background-color: red;"
                    casilla.addEventListener("click", (event)=>{
                        console.log(casilla.id);
                        generarTabla(casilla.id);
                        controlador = false;

                        
                    })
                }
                

                if(casilla2 !== null)
                {
                    casilla2.style = "background-color: red;"
                    casilla2.addEventListener("click", (event)=>{
                        console.log(casilla2.id);
                        generarTabla(casilla2.id);
                        controlador = false;

                        
                    })
                }
                

                if(casilla3 !== null)
                {
                    casilla3.style = "background-color: red;"
                    casilla3.addEventListener("click", (event)=>{
                        console.log(casilla3.id);
                        generarTabla(casilla3.id);
                        controlador = false;

                        
                    })
                }
                

                if(casilla4 !== null)
                {
                    casilla4.style = "background-color: red;"
                    casilla4.addEventListener("click", (event)=>{
                        console.log(casilla4.id);
                        generarTabla(casilla4.id);
                        controlador = false;

                        
                    })
                }
                
                // Y si todas las casillas son iguales a null, significa que el usuario se encuentra en un punto muerto y ha sacado un dado muy alto, por lo que le permito volver a tirar el dado.
                if(casilla == null && casilla2 == null && casilla3 == null && casilla4==null)
                {
                    alert("Vuelve a tirar");
                    controlador = false;
                }
            }
            
            
            
        }
    }
}



// Al iniciar el index se hará todo esto, pero como el botón jugar por defecto estará disabled, al usuario no registrado no se le permitirá clickarlo.
window.onload = botonJugar;


// Exporto el botón jugar porque se usará en el logueo.
export { botonJugar };