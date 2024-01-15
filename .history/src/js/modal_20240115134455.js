const BASE_URL = 'https://api.themoviedb.org/3';
const API_KEY = '4b17c8220205f4ea5b673c20a3e1f458';

const modalModule = (function () {
  const movieModal = document.getElementById('movieModal');
  const closeModalBtn = document.getElementById('closeModalBtn');
  const modalContent = document.getElementById('modalContent');
  const loaderContainer = document.getElementById('loaderContainer');

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

  return {
    showLoader,
    hideLoader,
    showModal,
    hideModal,
  };
})();

document.addEventListener('DOMContentLoaded', function () {
  const contentEl = document.querySelector('.content');

  contentEl.addEventListener('click', async function (event) {
    console.log('Clicked on contentEl');
    const targetMovieLink = event.target.closest('.link');
    console.log(targetMovieLink);
    if (targetMovieLink) {
      const movieId = targetMovieLink.dataset.movieId;

      modalModule.showLoader();

      try {
        const movieData = await fetchMovieDataFromAPI(movieId);
        const content = document.createElement('div');
        content.innerHTML = `
          <h2>${movieData.title}</h2>
          <p>${movieData.overview}</p>
          <p>Release Year: ${movieData.release_date}</p>
        `;
        modalModule.showModal(content);
      } catch (error) {
        console.error('Error fetching movie information:', error);
      } finally {
        modalModule.hideLoader();
      }
    }
  });
});
