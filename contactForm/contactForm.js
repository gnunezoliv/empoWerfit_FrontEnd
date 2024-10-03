document.addEventListener('DOMContentLoaded', () => {
    // Obtener el formulario
    const form = document.getElementById('contactForm');

    // Validar el formulario al enviarlo
    form.addEventListener('submit', function (event) {
        event.preventDefault(); // Evita el envío por defecto

        if (form.checkValidity()) {
            form.classList.add('was-validated');
            // Llama a la función para enviar el correo
            sendEmail(form); // Pasa el formulario como argumento
        } else {
            event.stopPropagation();
            form.classList.add('was-validated'); // Añade clases de validación de Bootstrap
        }
    });
});

// Inicializa EmailJS con tu API Key
(function(){
    emailjs.init("SHpyAFdFm51RaFDn1"); 
})();


// Función para verificar que la API Key funciona correctamente
(function(){
    emailjs.init("SHpyAFdFm51RaFDn1"); 
    console.log("EmailJS initialized");
})();

 
// Función para enviar el correo
function sendEmail(form) {
    // Obtener valores de los campos del formulario
    const name = document.getElementById('name').value;
    const email = document.getElementById('email').value;
    const phone = document.getElementById('phone').value;
    const message = document.getElementById('message').value;

    // Parámetros para enviar con EmailJS
    const templateParams = {
        name: name,
        email: email,
        phone: phone,
        message: message
    };

    // Enviar correo usando el Service ID y Template ID
    emailjs.send('contact_form', 'template_contact_form', templateParams)
    .then((response) => {
        console.log('Correo enviado con éxito', response.status, response.text);
       alert('Mensaje enviado con éxito.');
        form.reset(); // Reinicia el formulario después de enviarlo
    }, (error) => {
        console.error('Error al enviar el correo', error);
        alert('Hubo un problema al enviar el mensaje. Intenta de nuevo.');
    });
}