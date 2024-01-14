const modalModule = (function () {
  const movieModal = document.getElementById('movieModal');
  const closeModalBtn = document.getElementById('closeModal');
  const modalContent = document.getElementById('modalContent');
  const loaderContainer = document.getElementById('loaderContainer');
  const modalPoster = document.getElementById('modalPoster');
  const modalTitle = document.getElementById('modalTitle');

  function showLoader() {
    loaderContainer.style.display = 'flex';
  }

  function hideLoader() {
    loaderContainer.style.display = 'none';
  }

  function showModal(movieData) {
    modalTitle.textContent = movieData.title;
    modalContent.innerHTML = `
              <h2>${movieData.title}</h2>
              <img src="${movieData.posterUrl}" alt="${movieData.title} Poster" id="modalPoster">
              <p>${movieData.description}</p>
              <p>Release Year: ${movieData.releaseYear}</p>
              <!-- Add more movie details as needed -->
          `;
    hideLoader();
    movieModal.style.display = 'block';
  }

  function hideModal() {
    movieModal.style.display = 'none';
  }

  closeModalBtn.addEventListener('click', hideModal);

  window.addEventListener('click', function (event) {
    if (event.target === movieModal) {
      hideModal();
    }
  });

  window.addEventListener('keydown', function (event) {
    if (event.key === 'Escape') {
      hideModal();
    }
  });

  return {
    showLoader,
    hideLoader,
    showModal,
    hideModal,
  };
})();

document.addEventListener('DOMContentLoaded', function () {
  const posterCards = document.querySelectorAll('.poster-card');

  posterCards.forEach(function (posterCard) {
    posterCard.addEventListener('click', function () {
      modalModule.showLoader();

      // asynchronous request to fetch movie information
      fetchMovieInformation()
        .then(movieData => {
          modalModule.showModal(movieData);
        })
        .catch(error => {
          console.error('Error fetching movie information:', error);
          modalModule.hideLoader();
        });
    });
  });

  // function to fetch movie information from an API
  function fetchMovieInformation() {
    return new Promise((resolve, reject) => {
      // Simulating an API call with a delay
      setTimeout(() => {
        const movieData = {
          title: 'Sample Movie',
          description: 'This is a sample movie description.',
          releaseYear: 2022,
          posterUrl: 'path/to/sample-poster.jpg',
        };
        resolve(movieData);
      }, 2000);
    });
  }
});
