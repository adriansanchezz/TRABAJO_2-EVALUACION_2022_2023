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

// Inicializar Firebase
const analytics = getAnalytics(app);


// Función que valida el logueo.
function login() 
{
    // Se obtiene el valor de email y contraseña.
    var email = document.getElementById("email").value;
    var password = document.getElementById('password').value;
    const auth = getAuth();
    // Se comprueba la autenticación del usuario con esa password.
    signInWithEmailAndPassword(auth,email, password)
    .then(function(user) {
        // Si funciona correctamente entra aquí y entonces se llama a "funcionaboton()" que es para que funcione el botón jugar.

        // Además se invoca una "toast" de que se ha logueado correctamente.
        
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
        
      // Si no funciona entonces le aparecen "toasts" con los errores detectados en cuestión.

      const errorCode = error.code;
      const errorMessage = error.message;
  
      if (errorCode === 'auth/wrong-password' || errorCode === 'auth/user-not-found') {
        Toastify({
          text: "Credenciales incorrectas",
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
      if (errorCode === 'auth/network-request-failed') {
        // No se puede establecer conexión con Firebase
        Toastify({
          text: "Ha ocurrido un error de red. Por favor, verifica tu conexión a Internet e intenta de nuevo.",
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
      else{
        Toastify({
          text: "Error.",
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

// Función que valida el registro.
function registro() {
    
  // Se valida el email y la password para saber si pueden ser introducidas al firebase. 
    var email = document.getElementById("email").value;;
    var password = document.getElementById('password').value;
    const auth = getAuth();

    createUserWithEmailAndPassword(auth,email, password)
    .then(function(user) {
      
      // Si todo funciona correctamente se le muestra un mensaje indicando que ha sido registrado satisfactoriamente.
      Toastify({
        text: "Registrado correctamente.",
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
        
        // Si no funciona entonces le aparecen "toasts" con los errores detectados en cuestión.
        if(error.code === "auth/invalid-email")
        {
            let divReg = document.getElementById("form-container");

            Toastify({
                text: "Email invalido.",
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
          if(error.code === "auth/weak-password")
          {
              let emailAuth = document.getElementById("password");
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
          else
          {
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
          }
        }
  
    });
}

// La función inicio llama al botónJugar para que pueda aparecer en modo desactivado. Y además cuando es clickado alguno de los botones (login o registro) llama a las funciones en cuestión.
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

// Función para activar el botón Jugar.
function funcionaBoton()
{
    let boton = document.getElementById("botonJugar");
        boton.disabled = false;
        
}


window.onload = inicio;

