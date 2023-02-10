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
        let var1 = 0;
        let var2 = 0;
        generarTabla(`${var1}${var2}`);
    })
}

function generarTabla(posIn)
{
    
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
            td.style = "background-color: blue;";
            
            td.id = tr.id + u;
            if(td.id == posIn)
            {
                td.style = "background-color:violet;";
            }
            tr.appendChild(td);

            
        }
        table.appendChild(tr);
    }
    div1.appendChild(table);
    
    
}

function tirarDado()
{
    let div2 = document.createElement("div");
    document.body.appendChild(div2);
    let botonDado = document.createElement("button");
    botonDado.textContent = "TIRAR DADO";
    div2.appendChild(botonDado);

    botonDado.addEventListener("click", (event)=>{
        
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
                casilla.style = "background-color: red;"
                casilla.addEventListener("click", (event)=>{
                    console.log(casilla.id);
                    generarTabla(casilla.id);
                })
                let casilla2 = document.getElementById(`${i}${j+resultado}`);
                casilla2.style = "background-color: red;"
                casilla2.addEventListener("click", (event)=>{
                    console.log(casilla2.id);
                    generarTabla(casilla2.id);
                })

                let casilla3 = document.getElementById(`${i-resultado}${j}`);
                casilla3.style = "background-color: red;"
                casilla3.addEventListener("click", (event)=>{
                    console.log(casilla3.id);
                    generarTabla(casilla3.id);
                })
                let casilla4 = document.getElementById(`${i}${j-resultado}`);
                casilla4.style = "background-color: red;"
                casilla4.addEventListener("click", (event)=>{
                    console.log(casilla4.id);
                    generarTabla(casilla4.id);
                })

                if(casilla == null)
                {

                }
                else
                {

                }

                if(casilla2 == null)
                {

                }
                else
                {
                    
                }

                if(casilla3 == null)
                {

                }
                else
                {
                    
                }

                if(casilla4 == null)
                {

                }
                else
                {
                    
                }
                
            }
            
            
            
        }
    }
}

function a ()
{
    let pasaalgo; 
    pasaalgo = 0;
}

window.onload = botonJugar;