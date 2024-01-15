const modalModule = (function () {
  const movieModal = document.getElementById('movieModal');
  const closeModalBtn = document.getElementById('closeModal');
  const modalContent = document.getElementById('modalContent');
  const loaderContainer = document.getElementById('loaderContainer');

  async function fetchMovieDataFromAPI(movieId) {
    const apiEndpoint = 'https://api.themoviedb.org/3/movie/';
    const response = await fetch(`${apiEndpoint}${movieId}`);
    if (!response.ok) {
      throw new Error(`Failed to fetch movie data for ID ${movieId}`);
    }
    const data = await response.json();
    return data;
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
    const targetMovieLink = event.target.closest('.link');
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
