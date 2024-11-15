document.addEventListener("DOMContentLoaded", function () {
    let currentIndex = 0;
    const images = document.querySelectorAll(".carrusel-imagenes img");
    const totalImages = images.length;
    const leftButton = document.querySelector(".carrusel-btn.izquierda");
    const rightButton = document.querySelector(".carrusel-btn.derecha");

    // Función para mostrar imagen en el índice actual
    function showImage(index) {
        images.forEach((img, i) => {
            img.style.transform = `translateX(-${index * 100}%)`;
        });
    }

    // Funciones de navegación del carrusel
    function nextImage() {
        currentIndex = (currentIndex + 1) % totalImages;
        showImage(currentIndex);
    }

    function prevImage() {
        currentIndex = (currentIndex - 1 + totalImages) % totalImages;
        showImage(currentIndex);
    }

    // Eliminar la navegación automática
    // setInterval(nextImage, 3000);  // Esta línea ha sido eliminada para desactivar la navegación automática

    // Event listeners para botones de navegación
    rightButton.addEventListener("click", nextImage);
    leftButton.addEventListener("click", prevImage);

    // Agrega interactividad a los iconos de "me gusta" y "comentarios"
    const actions = document.querySelectorAll(".acciones i");
    actions.forEach(action => {
        action.addEventListener("click", (e) => {
            if (e.target.classList.contains("bi-heart")) {
                e.target.classList.toggle("text-danger");
                e.target.style.color = "#AA3378";  // Cambia el color del corazón a magenta
            } else if (e.target.classList.contains("bi-chat")) {
                alert("¡Deja tu comentario!");
            }
        });
    });

    // Añadir efecto de subrayado a los títulos y nombres de usuario al pasar el cursor
    const publicaciones = document.querySelectorAll(".publicacion h3, .usuario span");
    publicaciones.forEach(element => {
        element.addEventListener("mouseenter", () => {
            element.style.textDecoration = "underline";
            element.style.textDecorationColor = "#AA3378";  // Subrayado en magenta
        });
        element.addEventListener("mouseleave", () => {
            element.style.textDecoration = "none";
        });
    });

    // Mostrar primera imagen del carrusel al cargar la página
    showImage(currentIndex);
});
