
document.addEventListener('DOMContentLoaded', function () {
    const carruselImages = document.querySelector('.carrusel-imagenes');
    const images = document.querySelectorAll('.carrusel-imagenes .carrusel-item');
    const leftButton = document.querySelector('.izquierda');
    const rightButton = document.querySelector('.derecha');
    let currentIndex = 0;

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
