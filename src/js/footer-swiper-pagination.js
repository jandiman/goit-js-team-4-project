import Swiper from 'swiper';

const swiper = new Swiper('.mySwiper', {
  speed: 400,
  slidesPerView: 5,
  spaceBetween: 30,
  breakpoints: {
    358: {
      slidesPerView: 3,
      spaceBetween: 30,
    },
    768: {
      slidesPerView: 4,
      spaceBetween: 30,
    },
    1200: {
      slidesPerView: 5,
      spaceBetween: 30,
    },
  },
  keyboard: true,
  navigation: true,
  pagination: {
    el: '.footer-swiper-pagination',
    clickable: true,
  },
});

// swiper.nextSlide();
