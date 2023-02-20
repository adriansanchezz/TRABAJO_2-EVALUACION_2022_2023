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
    try {
        const credencialesUser = await createUserWithEmailAndPassword(auth, email, password);
        console.log(credencialesUser);
    } catch (error) {
        console.log(error);
    }
    
})




