const openModalFooter = document.querySelector('[footer-modal-open]');
const closeModalFooter = document.querySelector('[footer-modal-close]');
const modal = document.querySelector('[footer-data-modal]');

function toggleModal() {
  modal.classList.toggle('is-hidden');
}

openModalFooter.addEventListener('click', toggleModal);
closeModalFooter.addEventListener('click', toggleModal);
