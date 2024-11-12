const swiper = new Swiper(".slide-container ", {
    slidesPerView: 4,
    centeredSlides: false,
    spaceBetween: 25,
    grabCursor: "true",
    fade: "true",
    pagination: {
        el: ".swiper-pagination",
        clickable: true,
        dynamicBullets: true
      },
    navigation: {
      nextEl: ".swiper-button-next",
      prevEl: ".swiper-button-prev",
    },

    breakpoints: {
        0: { slidesPerView: 1 },
        520: { slidesPerView: 2 },
        768: { slidesPerView: 2 },
        1000: { slidesPerView: 4 },
    },
  });

/*  */
document.addEventListener("DOMContentLoaded", function () {
  fetch("/sources/items/items.json")
    .then(response => response.json())
    .then(data => {
      const productos = data;

      // Encuentra el contenedor donde se agregarán las tarjetas
      const cardWrapper = document.querySelector('.card-wrapper');

      productos.forEach((producto) => {
        const imagen = producto.image || 'https://via.placeholder.com/150'; // Imagen predeterminada
        const nombre = producto.name || 'Nombre no disponible'; // Nombre predeterminado si no existe

        const slide = document.createElement('div');
        slide.classList.add('card-product', 'swiper-slide', 'mb-5');

        // Crea una referencia dinámica para que cada tarjeta lleve a una página HTML diferente
        const itemDetailUrl = `/sources/items/itemDetail/itemDetail.html?id=${producto.id}`;

        slide.innerHTML = `
    <div class="image-box">
      <img src="${imagen || 'https://via.placeholder.com/150'}" alt="${nombre}">
    </div>
    <div class="product-details text-center">
      <div class="name-btn">
        <h3 class="name d-inline-block text-truncate" style="max-width: 200px;">${nombre}</h3>
        <a href="${itemDetailUrl}" class="btn-product d-block">Ver detalles</a>
      </div>
    </div>
  `;

        // Encuentra el contenedor donde agregar las tarjetas
        cardWrapper.appendChild(slide);
      });
    })
    .catch(error => {
      console.error("Error al cargar los productos:", error);
    });
});