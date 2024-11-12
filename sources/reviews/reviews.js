function calificaciones(containerId, totalEstrellas = 5) {
    const contenedor = document.getElementById(containerId);
    contenedor.innerHTML = ''; // Limpiar cualquier contenido previo

    for (let i = totalEstrellas; i >= 1; i--) {
        // Crear el radio button para cada estrella
        const input = document.createElement('input');
        input.type = 'radio';
        input.id = `estrellas${i}`;
        input.name = 'calificacion';
        input.value = i;
        input.classList.add('estrellas-input'); // Agregar clase para estilos

        // Crear la etiqueta asociada a la estrella
        const label = document.createElement('label');
        label.setAttribute('for', `estrellas${i}`);
        label.textContent = `${i} estrellas`;

        // Agregar el radio button y la etiqueta al contenedor
        contenedor.appendChild(input);
        contenedor.appendChild(label);
    }
}

// Llamar a la función para crear el sistema de calificación
calificaciones('calificacion-contenedor');

// Función para manejar el envío del formulario
document.getElementById('comentario-form').addEventListener('submit', function (event) {
    event.preventDefault(); // Evitar que se recargue la página

    // Obtener los valores del formulario
    const nombre = document.getElementById('nombre').value;
    const comentario = document.getElementById('comentario').value;

    // Obtener la calificación seleccionada (buscar el input de tipo radio marcado)
    const calificacionSeleccionada = document.querySelector('input[name="calificacion"]:checked');

    // Validar que todos los campos estén completos
    if (!nombre || !comentario || !calificacionSeleccionada) {
        alert('Por favor, completa todos los campos.');
        return;
    }

    const calificacion = calificacionSeleccionada.value; // Obtenemos el valor de la calificación

    // Mostrar el mensaje de confirmación
    const submissionMessage = document.getElementById('submission-message');
    submissionMessage.textContent = `Gracias, ${nombre}.Se envió tu comentario y calificación de ${calificacion} estrellas.`;
    submissionMessage.style.display = 'block';

    // Limpiar el formulario después de enviarlo
    document.getElementById('comentario-form').reset();
    const ratingInputs = document.querySelectorAll('input[name="calificacion"]');
    ratingInputs.forEach(input => input.checked = false);
});