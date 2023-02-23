'use strict';
// Import the functions you need from the SDKs you need
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// 
import { initializeApp } from "https://www.gstatic.com/firebasejs/9.17.1/firebase-app.js";
import { getAuth, createUserWithEmailAndPassword, signInWithEmailAndPassword } from "https://www.gstatic.com/firebasejs/9.17.1/firebase-auth.js";
import { getAnalytics } from "https://www.gstatic.com/firebasejs/9.17.1/firebase-analytics.js";


import {firebaseConfig} from "./firebase.js";

import { botonJugar } from "./js.js";

// Inicialiar la conexión Firebase
const app = initializeApp(firebaseConfig);

// Initialize Firebase
const analytics = getAnalytics(app);

function login() 
{
    console.log("LOGIN");
    var email = document.getElementById("email").value;
    var password = document.getElementById('password').value;
    const auth = getAuth();
    signInWithEmailAndPassword(auth,email, password)
    .then(function(user) {
        console.log(user['user'].email);
        console.log("User logged in: ", user);
        
        // Redirigir al panel de usuario o mostrar un mensaje
        funcionaBoton();
        Toastify({
            text: "Logueado correctamente.",
            duration: 3000,
            destination: "https://github.com/apvarun/toastify-js",
            newWindow: true,
            close: true,
            gravity: "top", // `top` or `bottom`
            position: "left", // `left`, `center` or `right`
            stopOnFocus: true, // Prevents dismissing of toast on hover
            style: {
              background: "linear-gradient(to right, #00b09b, #96c93d)",
            },
            onClick: function(){} // Callback after click
          }).showToast();

        
    })
    .catch(function(error) {
        console.log("Error logging in: ", error);
        alert("Error logging in: ", error)
        // Mostrar mensaje de error
        
    });
}

function registro() {
    console.log("REGISTER");
  alert("REGISTER")
    var email = document.getElementById("email").value;;
    var password = document.getElementById('password').value;
    const auth = getAuth();
    alert(`auth: ${auth} email: ${email}   password: ${password}`)
    createUserWithEmailAndPassword(auth,email, password)
    .then(function(user) {
        console.log("User registered: ", user);
        // Redirigir al panel de usuario o mostrar un mensaje
        alert("User registered: ", user)
    })
    .catch(function(error) {
        console.log("Error registering: ", error);
        // Mostar mensaje de error
        alert("Error registering: ", error);
        console.log(error.code);
        if(error.code === "auth/invalid-email")
        {
            let divReg = document.getElementById("form-container");
            let emailAuth = document.getElementById("email");
            emailAuth.style.backgroundColor = "red";
            Toastify({
                text: "Email inválido.",
                duration: 3000,
                destination: "https://github.com/apvarun/toastify-js",
                newWindow: true,
                close: true,
                gravity: "top", // `top` or `bottom`
                position: "left", // `left`, `center` or `right`
                stopOnFocus: true, // Prevents dismissing of toast on hover
                style: {
                  background: "linear-gradient(to right, #00b09b, #96c93d)",
                },
                onClick: function(){} // Callback after click
              }).showToast();
        }
        if(error.code === "auth/weak-password")
        {
            let emailAuth = document.getElementById("signup-password");
            emailAuth.style.backgroundColor = "red";
            Toastify({
                text: "Contraseña débil.",
                duration: 3000,
                destination: "https://github.com/apvarun/toastify-js",
                newWindow: true,
                close: true,
                gravity: "top", // `top` or `bottom`
                position: "left", // `left`, `center` or `right`
                stopOnFocus: true, // Prevents dismissing of toast on hover
                style: {
                  background: "linear-gradient(to right, #00b09b, #96c93d)",
                },
                onClick: function(){} // Callback after click
              }).showToast();
        }
        if(error.code === "auth/email-already-in-use")
        {
            let emailAuth = document.getElementById("signup-password");
            emailAuth.style.backgroundColor = "red";
            Toastify({
                text: "Email ya en uso.",
                duration: 3000,
                destination: "https://github.com/apvarun/toastify-js",
                newWindow: true,
                close: true,
                gravity: "top", // `top` or `bottom`
                position: "left", // `left`, `center` or `right`
                stopOnFocus: true, // Prevents dismissing of toast on hover
                style: {
                  background: "linear-gradient(to right, #00b09b, #96c93d)",
                },
                onClick: function(){} // Callback after click
              }).showToast();
        }
        else
        {
            Toastify({
                text: "Hubo un error en la autenticación.",
                duration: 3000,
                destination: "https://github.com/apvarun/toastify-js",
                newWindow: true,
                close: true,
                gravity: "top", // `top` or `bottom`
                position: "left", // `left`, `center` or `right`
                stopOnFocus: true, // Prevents dismissing of toast on hover
                style: {
                  background: "linear-gradient(to right, #00b09b, #96c93d)",
                },
                onClick: function(){} // Callback after click
              }).showToast();
        }
    });
}

function inicio(){
    botonJugar();
    document.getElementsByClassName("btn btn-primary")[0].addEventListener("click",(e)=>{
        e.preventDefault();
        registro();

    });
    document.getElementsByClassName("btn btn-secondary")[0].addEventListener("click",(e)=>{
        e.preventDefault();
        login();

    });
}

window.onload = inicio;

function funcionaBoton()
{
    let boton = document.getElementById("botonJugar");
        boton.disabled = false;
}