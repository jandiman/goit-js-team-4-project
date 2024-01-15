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
            content.innerHTML = `<div class="modal-popup">
            <div class="movie-poster">
            <img src="${
            movieData.poster_path
              ? `https://image.tmdb.org/t/p/w500${movieData.poster_path}`
              : 'https://static.wikia.nocookie.net/ideas/images/6/66/FoxAndroidTM2%27s_No_Poster.jpg'
              }" alt="${movieData.title}" class="modal-poster" />
            </div>
            <div class="movie-details">
              <h2 class="title main-title">${movieData.title}</h2>
              <p><span class="categ">Vote / Votes </span><span class="val">${`${movieData.vote_average}`.padStart(0,'0')}</span></p>
              <p><span class="categ">Popularity</span><span class="val">${  movieData.popularity}</span></p>
              <p class="title"><span class="categ">Original Title</span><span class="val">${movieData.title}</span></p>
              <p><span class="categ">Genre</span>${movieData.genres
                .map(({ name }) => {
                  return ` ${name}`;
                })
                .join(',').trim()}</span></p>
              
              <div class="abt">
              <p>ABOUT</p>
              <p>${movieData.overview}</p>
              </div>
              <div class="button-div">
                <button class="modal-button btn-page" data-watch="${movieData.id}">ADD TO WATCHED</button>
                <button class="modal-button btn-page" data-queue="${movieData.id}">ADD TO QUEUE</button>
              </div>
              </div>
              </div>
            `;
            showModal(content);

            const btnWatch = document.querySelector('button[data-watch]');
            const btnQueue = document.querySelector('button[data-queue]');
            const dataLoad = {
              dataQueued:[],
              dataWatched:[],
            };

            if(!localStorage.getItem('SAVED_CURRENT')){
              localStorage.setItem('SAVED_CURRENT',JSON.stringify(dataLoad));
            }
            
            btnWatch.addEventListener('click',(event)=>{
              dataLoad.dataWatched.push(event.currentTarget.dataset.watch)
              localStorage.setItem('SAVED_CURRENT',JSON.stringify(dataLoad));
            })

            btnQueue.addEventListener('click',(event)=>{
              dataLoad.dataQueued.push(event.currentTarget.dataset.queue)
              localStorage.setItem('SAVED_CURRENT',JSON.stringify(dataLoad));
            });
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

document.addEventListener('DOMContentLoaded', function () {});
