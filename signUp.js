import { createUserWithEmailAndPassword } from "https://www.gstatic.com/firebasejs/9.10.0/firebase-auth.js";
import { auth } from "./firebase.js";

let signUp = document.getElementById("signup-form");

signUp.addEventListener('submit', async(event) =>{
    event.preventDefault();
    console.log("ESTOY");

    let email = signUp['signup-email'].value;
    let password = signUp['signup-password'].value;

    console.log(email, password);
    
    // Registrarse
    try 
    {
        const credencialesUser = await createUserWithEmailAndPassword(auth, email, password);
        console.log(credencialesUser);

        let divReg = document.getElementById("signup-form");
        divReg.remove();
    } 
    catch (error) 
    {
        console.log(error);
        console.log(error.code);
        if(error.code === "auth/invalid-email")
        {
            let divReg = document.getElementById("signup-form");
            let emailAuth = document.getElementById("signup-email");
            emailAuth.style.backgroundColor = "red";
            let emailp = document.getElementById("emailp");
            if(emailp)
            {
                emailp.remove();
            }
            let p = document.createElement("p");
            p.id = "emailp";
            p.textContent = "Email incorrecto."
            document.body.appendChild(p);
        }
        if(error.code === "auth/weak-password")
        {
            let emailAuth = document.getElementById("signup-password");
            emailAuth.style.backgroundColor = "red";
            let passp = document.getElementById("passp");
            if(passp)
            {
                passp.remove();
            }
            let p = document.createElement("p");
            p.id = "passp";
            p.textContent = "La contraseña es débil."
            document.body.appendChild(p);
        }
        if(error.code === "auth/email-already-in-use")
        {
            let emailAuth = document.getElementById("signup-password");
            emailAuth.style.backgroundColor = "red";
            let existp = document.getElementById("existp");
            if(existp)
            {
                existp.remove();
            }
            let p = document.createElement("p");
            p.id = "existp";
            p.textContent = "El email ya existe."
            document.body.appendChild(p);
        }
        else
        {
            let errorp = document.getElementById("errorp");
            if(errorp)
            {
                errorp.remove();
            }
            let p = document.createElement("p");
            p.id = "existp";
            p.textContent = "El email ya existe."
            document.body.appendChild(p);
        }
    }
    
})




