let controlador = false;

let controladorCajas = false;

let cajas = [];

function botonJugar()
{
    
    let div1 = document.createElement("div");
    div1.id = "DIV1";
    let boton = document.createElement("button");
    boton.textContent = "JUGAR";
    document.body.appendChild(div1);
    div1.appendChild(boton);

    tirarDado();
    boton.addEventListener("click", (event)=>{
        boton.style = "display: none;"
        if(controladorCajas == false)
        {
            for(let i = 0; i < cajas.length; i++)
            {
                delete(cajas[i]);
            }
        }
        
        controladorCajas = false;
        let var1 = 0;
        let var2 = 0;
        generarTabla(`${var1}${var2}`);
        
        document.body.style = "background-image: url('../imagenes/fondo.jpg'); background-size: cover;"
    })
}

function generarTabla(posIn)
{
    let caja1 = Math.floor(Math.random() * 99);
    let caja2 = Math.floor(Math.random() * 99);
    let caja3 = Math.floor(Math.random() * 99);
    while(caja1 == 00 || caja2 == 00 || caja3 == 00)
    {
        caja1 = Math.floor(Math.random() * 99);
        caja2 = Math.floor(Math.random() * 99);
        caja3 = Math.floor(Math.random() * 99);
    }

    let tablero = document.getElementById("tablero");
    if(tablero)
    {
        tablero.remove();
    }
    let div1 = document.getElementById("DIV1");
    let table = document.createElement("table");
    table.border = 1;
    table.id = "tablero";
    table.setAttribute("posIn", posIn);
    for(let i = 0; i < 10; i++)
    {
        let tr = document.createElement("tr");
        
        tr.id = i;
        for(let u = 0; u<10; u++)
        {
            let td = document.createElement("td");
            td.style = "background-image: url('../imagenes/eps8woq9nh9z.png'); background-size: cover;";
            
            td.id = tr.id + u;
            if(td.id == posIn)
            {
                td.style = "background-image: url('../imagenes/eps8woq9nh9z.png'); background-size: cover;";
                let imagen = document.createElement("img");
                imagen.src = "../imagenes/pj.png";
                imagen.className = "Guts";
                td.appendChild(imagen);

            }
            if(td.id == 99)
            {
                let imagen = document.createElement("img");
                imagen.src = "../imagenes/tesoro.png";
                td.appendChild(imagen);
            }
            if(td.id == caja1 || td.id == caja2 || td.id == caja3)
            {
                if(controladorCajas == false)
                {
                    let imagen = document.createElement("img");
                    imagen.src = "../imagenes/box.png";
                    td.appendChild(imagen);
                    cajas.push(td);
                    
                }
                
            }
            
            
            tr.appendChild(td);

            
        }
        table.appendChild(tr);
    }
    div1.appendChild(table);
    
    controladorCajas = true;
    if(controladorCajas == true)
    {
        saberCajas();
    }
    
    
    

}


function saberCajas()
{
    let casilla = document.getElementById(`${cajas[0].id}`);
    let casilla2 = document.getElementById(`${cajas[1].id}`);
    let casilla3 = document.getElementById(`${cajas[2].id}`);
    let imagen = document.createElement("img");
    imagen.src = "../imagenes/box.png";
    let imagen2 = document.createElement("img");
    imagen2.src = "../imagenes/box.png";
    let imagen3 = document.createElement("img");
    imagen3.src = "../imagenes/box.png";
    casilla.appendChild(imagen);
    casilla2.appendChild(imagen2);
    casilla3.appendChild(imagen3);
    
}


function tirarDado()
{
    
    
    let div2 = document.createElement("div");
    document.body.appendChild(div2);
    let botonDado = document.createElement("button");
    botonDado.textContent = "TIRAR DADO";
    div2.appendChild(botonDado);

    botonDado.addEventListener("click", (event)=>{
        
        if(controlador == false)
        {
            controlador = true;
            let comprobarDado = document.getElementById("tiradaDado");
            if(comprobarDado)
            {
                comprobarDado.remove();
            }
            let resultado = Math.floor(Math.random() * 7);
            while(resultado == 0)
            {
                resultado = Math.floor(Math.random() * 7);
            }
            let h1 = document.createElement("h1");
            h1.textContent = resultado;
            h1.id = "tiradaDado";
            div2.appendChild(h1);
            Casillas(resultado);
            
        }
        
        
    })

}

function Casillas(resultado)
{
    for(let i = 0; i < 10; i++)
    {
        for(let j = 0; j < 10; j++)
        {
            let tablero = document.getElementById("tablero");
            let posicion = tablero.getAttribute("posIn");
            
            if(`${i}${j}` == posicion)
            {
                console.log(`${i+resultado}${j}`);
                let casilla = document.getElementById(`${i+resultado}${j}`);
                
                let casilla2 = document.getElementById(`${i}${j+resultado}`);
                

                let casilla3 = document.getElementById(`${i-resultado}${j}`);
                
                let casilla4 = document.getElementById(`${i}${j-resultado}`);
                

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
                
                
            }
            
            
            
        }
    }
}




window.onload = botonJugar;
