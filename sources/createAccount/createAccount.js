// createAccount.js (Modificado para almacenar los datos del usuario en localStorage)
document.getElementById("contactForm").addEventListener("submit", function (event) {
    event.preventDefault();
    event.stopPropagation();
    
    let form = event.target;
    if (form.checkValidity() === false) {
        form.classList.add("was-validated");
        return;
    }

    // Validaciones adicionales para la contraseña
    let password = document.getElementById("password").value;
    let confirmPassword = document.getElementById("confirm-password").value;

    // Verificar si la contraseña tiene al menos 8 caracteres, una letra mayúscula y un número
    let passwordRegex = /^(?=.*[A-Z])(?=.*\d)[A-Za-z\d]{8,}$/;
    if (!passwordRegex.test(password)) {
        document.getElementById("password").setCustomValidity("La contraseña debe tener al menos 8 caracteres, una letra mayúscula y un número.");
        document.getElementById("password").reportValidity();
        form.classList.add("was-validated");
        return;
    } else {
        document.getElementById("password").setCustomValidity("");
    }

    if (password !== confirmPassword) {
        document.getElementById("confirm-password").setCustomValidity("Las contraseñas no coinciden.");
        document.getElementById("confirm-password").reportValidity();
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

    // Almacenar el usuario en localStorage
    localStorage.setItem(user.email, JSON.stringify(user));

    // Mostrar el JSON del usuario en consola
    console.log("Usuario registrado:", JSON.stringify(user));

    // Mostrar mensaje de éxito usando Bootstrap alert
    let alertSuccess = document.createElement("div");
    alertSuccess.className = "alert alert-success mt-3";
    alertSuccess.role = "alert";
    alertSuccess.innerText = "Cuenta creada con éxito.";
    form.appendChild(alertSuccess);

    // Redirigir al inicio de sesión después de crear la cuenta
    setTimeout(function() {
        window.location.href = "../signIn/signIn.html";
    }, 2000);

    // Limpiar el formulario sin eliminar el mensaje de éxito ni el JSON de la consola
    form.reset();
    form.classList.remove("was-validated");
});



