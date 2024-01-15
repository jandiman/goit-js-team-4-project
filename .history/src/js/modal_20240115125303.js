const modalModule = (function () {
  const movieModal = document.getElementById('movieModal');
  const closeModalBtn = document.getElementById('closeModal');
  const modalContent = document.getElementById('modalContent');
  const loaderContainer = document.getElementById('loaderContainer');

  // Replace this with your actual movie API base URL
  const apiEndpoint = 'https://api.themoviedb.org/3/movie/';

  async function fetchMovieDataFromAPI(movieId) {
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

    // Clear previous content
    while (modalContent.firstChild) {
      modalContent.removeChild(modalContent.firstChild);
    }

    // Append new content
    modalContent.appendChild(content);

    // Display modal
    movieModal.style.display = 'block';
  }

  function hideModal() {
    movieModal.style.display = 'none';
  }

  // Add null checks before adding event listeners
  if (closeModalBtn) {
    closeModalBtn.addEventListener('click', hideModal);
  }

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

  // Add null check before adding the contentEl click event listener
  if (contentEl) {
    contentEl.addEventListener('click', function (event) {
      const targetMovieLink = event.target.closest('.link');
      if (targetMovieLink) {
        const movieId = targetMovieLink.dataset.movieId;

        modalModule.showLoader();

        // Fetch movie information based on movieId
        fetchMovieInformation(movieId)
          .catch(error => {
            console.error('Error fetching movie information:', error);
          })
          .finally(() => {
            modalModule.hideLoader();
          });
      }
    });
  }

  // function to fetch movie information from an API
  function fetchMovieInformation(id) {
    return new Promise(async (resolve, reject) => {
      try {
        // Call the function to fetch movie data from your API (movie-api.js)
        const movieData = await movieDetail(id);

        // Render the content directly in the modal
        modalModule.showModal(renderItem(movieData));

        resolve();
      } catch (error) {
        console.error('Error fetching movie data:', error);
        reject(error);
      }
    });
  }
});
