const swiper = new Swiper(".slide-container ", {
    slidesPerView: 4,
    centeredSlides: false,
    spaceBetween: 20,
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
        768: { slidesPerView: 3 },
        1000: { slidesPerView: 4 },
    },
  });

  