let signUp = document.getElementById("signup-form");

signUp.addEventListener('submit', (event) =>{
    event.preventDefault();
    console.log("ESTOY");

    let email = signUp['signup-email'].value;
    let password = signUp['signup-password'].value;

    console.log(email, password);
    
    window.location.href = "index.html";

})




