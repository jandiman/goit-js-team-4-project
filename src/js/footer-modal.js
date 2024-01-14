const openModalFooter = document.querySelector('[footer-modal-open]');
const closeModalFooter = document.querySelector('[footer-modal-close]');
const modal = document.querySelector('[footer-data-modal]');

function toggleModal() {
  modal.classList.toggle('is-hidden');
}

openModalFooter.addEventListener('click', toggleModal);
closeModalFooter.addEventListener('click', toggleModal);

// const galleryList = document.querySelector('.gallery');

// const createGallery = element => {
//   return element
//     .map(({ preview, original, description }) => {
//       return `<li class="gallery-item">
//    <a class="gallery-link" href="${original}">
//       <img class="gallery-image" src="${preview}" alt="${description}" />
//    </a>
// </li>`;
//     })
//     .join('');
// };

// const photosList = createGallery(teamMembers);
// galleryList.insertAdjacentHTML('beforeend', photosList);

// console.log(galleryItems);

// const lightbox = new SimpleLightbox('.gallery a', {
//   captionsData: 'alt',
//   captionDelay: 250,
//   nav: true,
//   captionPosition: 'bottom',
// });
