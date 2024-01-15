const BASE_URL = 'https://api.themoviedb.org/3';
const API_KEY = 'df3d71dc2c14b1899746da6d2afcfb5b';

const modalModule = (function () {
  const movieModal = document.getElementById('movieModal');
  const closeModalBtn = document.getElementById('closeModalBtn');
  const modalContent = document.getElementById('modalContent');
  const loaderContainer = document.getElementById('loaderContainer');
  const contentEl = document.getElementById('content');

  contentEl.addEventListener('click', openModal);

  async function fetchMovieDataFromAPI(movieId) {
    const apiEndpoint = `${BASE_URL}/movie/${movieId}?api_key=${API_KEY}`;

    try {
      const response = await fetch(apiEndpoint);

      if (!response.ok) {
        throw new Error(`Failed to fetch movie data for ID ${movieId}`);
      }

      const data = await response.json();
      return data;
    } catch (error) {
      throw new Error(`Error fetching movie data: ${error.message}`);
    }
  }

  function showLoader() {
    loaderContainer.style.display = 'flex';
  }

  function hideLoader() {
    loaderContainer.style.display = 'none';
  }

  function showModal(content) {
    hideLoader();
    modalContent.innerHTML = '';
    modalContent.appendChild(content);
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

  async function openModal(event) {
    event.preventDefault();

    if (event.target.nodeName === 'IMG') {
      showLoader();

      const targetMovieLink = event.target.id;
      console.log(targetMovieLink);
      if (targetMovieLink) {
        const movieId = targetMovieLink;

        if (movieId) {
          try {
            const movieData = await fetchMovieDataFromAPI(movieId);
            const content = document.createElement('div');
            content.innerHTML = `
              <h2>${movieData.title}</h2>
              <p>Original Title   ${movieData.title}</p>
              <p>Genre ${movieData.genre}</p>
              <p>About</p>
              <p>${movieData.overview}</p>
              <div class="button-div">
              <button class="modal-button">ADD TO WATCHED</button>
              <button class="modal-button">ADD TO QUEUE</button>
              </div>
            `;
            showModal(content);
          } catch (error) {
            console.error('Error fetching movie information:', error);
          } finally {
            hideLoader();
          }
        } else {
          console.error('Movie ID is undefined.');
          hideLoader();
        }
      }
    }
  }

  return {
    showLoader,
    hideLoader,
    showModal,
    hideModal,
  };
})();

document.addEventListener('DOMContentLoaded', function () {
  // No redundant definitions or event listeners here
});
