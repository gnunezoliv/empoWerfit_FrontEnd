document.getElementById("contactForm").addEventListener("submit", function (event) {
    event.preventDefault();
    event.stopPropagation();
    
    let form = event.target;
    if (form.checkValidity() === false) {
        form.classList.add("was-validated");
        return;
    }

    // Validaciones adicionales para las contraseñas
    let password = document.getElementById("password").value;
    let confirmPassword = document.getElementById("confirm-password").value;
    if (password !== confirmPassword) {
        document.getElementById("confirm-password").setCustomValidity("Las contraseñas no coinciden.");
        form.classList.add("was-validated");
        return;
    } else {
        document.getElementById("confirm-password").setCustomValidity("");
    }

    // Si todo es válido, crear el objeto JSON del usuario
    let user = {
        name: document.getElementById("name").value,
        email: document.getElementById("email").value,
        phone: document.getElementById("phone").value,
        password: password
    };

    // Mostrar el JSON en consola (puedes cambiar esto por otro comportamiento deseado)
    console.log(JSON.stringify(user));
    
    // Mostrar mensaje de éxito usando Bootstrap alert
    let alertSuccess = document.createElement("div");
    alertSuccess.className = "alert alert-success mt-3";
    alertSuccess.role = "alert";
    alertSuccess.innerText = "Cuenta creada con éxito.";
    form.appendChild(alertSuccess);

    // Limpiar el formulario sin eliminar el mensaje de éxito ni el JSON de la consola
    form.reset();
    form.classList.remove("was-validated");
});
