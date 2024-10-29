// signIn.js (Nuevo archivo para manejar el inicio de sesión)
document.getElementById("contactForm").addEventListener("submit", function (event) {
    event.preventDefault();
    event.stopPropagation();
    
    let form = event.target;
    if (form.checkValidity() === false) {
        form.classList.add("was-validated");
        return;
    }

    // Obtener los valores del formulario
    let email = document.getElementById("email").value;
    let password = document.getElementById("password").value;

    // Buscar el usuario en localStorage
    let storedUser = localStorage.getItem(email);
    // Mostrar todos los usuarios en consola
    console.log("Usuarios almacenados:", Object.keys(localStorage).map(key => JSON.parse(localStorage.getItem(key))));
    if (storedUser) {
        let user = JSON.parse(storedUser);
        if (user.password === password) {
            // Almacenar al usuario actual en localStorage
            localStorage.setItem("currentUser", JSON.stringify(user));
            // Redirigir al usuario a la página de inicio si la autenticación es exitosa
            window.location.href = "../items/items.html";
        } else {
            // Mostrar mensaje de error si la contraseña no es correcta
            showErrorMessage(form, "Contraseña incorrecta.");
            form.reset();
        }
    } else {
        // Mostrar mensaje de error si el usuario no existe
        showErrorMessage(form, "Usuario no encontrado.");
        form.reset();
    }
});

// Función para mostrar mensajes de error
function showErrorMessage(form, message) {
    let alertError = document.createElement("div");
    alertError.className = "alert alert-danger mt-3";
    alertError.role = "alert";
    alertError.innerText = message;
    form.appendChild(alertError);
}


