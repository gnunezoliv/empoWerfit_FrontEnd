document.addEventListener('DOMContentLoaded', function () {
    const leftButton = document.querySelector('.carrusel-btn.izquierda');
    const rightButton = document.querySelector('.carrusel-btn.derecha');
    const carruselImages = document.querySelector('.carrusel-imagenes');
    const images = Array.from(carruselImages.children);
    let currentIndex = 0;

    // Mostrar la primera imagen
    updateCarousel();

    // Función para actualizar el carrusel
    function updateCarousel() {
        carruselImages.style.transform = `translateX(-${currentIndex * 100}%)`;
    }

    // Botón izquierdo
    leftButton.addEventListener('click', function () {
        if (currentIndex > 0) {
            currentIndex--;
        } else {
            currentIndex = images.length - 1;
        }
        updateCarousel();
    });

    // Botón derecho
    rightButton.addEventListener('click', function () {
        if (currentIndex < images.length - 1) {
            currentIndex++;
        } else {
            currentIndex = 0;
        }
        updateCarousel();
    });
});
