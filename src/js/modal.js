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
              <h2 class="title main-title"><a href="${movieData.homepage}" target="_target" class="link page">${movieData.title}</a></h2>
              <p><span class="categ">Vote / Votes </span><span class="val">${`${movieData.vote_average}`.padStart(0,'0')}</span></p>
              <p><span class="categ">Popularity</span><span class="val">${  movieData.popularity}</span></p>
              <p class="title"><span class="categ">Original Title</span><span class="val">${movieData.title}</span></p>
              <p><span class="categ">Genre:</span><span class="genre-list">${movieData.genres
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
            

            if(!localStorage.getItem('SAVED_CURRENT')){
              localStorage.setItem('SAVED_CURRENT',JSON.stringify({
                dataQueued:[],
                dataWatched:[],
              }));
              return;
            }
            const dataLoad = JSON.parse(localStorage.getItem('SAVED_CURRENT'));
            dataLoad.dataQueued.map(el => {
              console.log('element:',el);
              if(el === movieId){
                btnQueue.textContent = 'added to Queued';
                btnQueue.classList.add('active');
              }
            })
            dataLoad.dataWatched.map(el => {
              console.log('element:',el);
              if(el === movieId){
                btnWatch.textContent = 'added to watched';
                btnWatch.classList.add('active');   
              }
            })
            
            btnWatch.addEventListener('click',(event)=>{
              const id = event.currentTarget.dataset.watch;
              for (const data of dataLoad.dataWatched) {
                if(data === id){
                  dataLoad.dataWatched.splice(dataLoad.dataWatched.indexOf(data),1);
                  event.currentTarget.textContent = 'add to Watched';
                  event.currentTarget.classList.remove('active');
                  localStorage.setItem('SAVED_CURRENT',JSON.stringify(dataLoad));
                  return;
                }
              }
              dataLoad.dataWatched.push(id);
              event.currentTarget.textContent = 'added to Watched';
              event.currentTarget.classList.add('active');
              localStorage.setItem('SAVED_CURRENT',JSON.stringify(dataLoad));

              if(dataLoad.dataPage === 'home'){
                console.log('HOME PAGE');
                return;
              }
              console.log('LIBRARY PAGE');
            })

            btnQueue.addEventListener('click',(event)=>{
              const id = event.currentTarget.dataset.queue;
              for (const data of dataLoad.dataQueued) {
                if(data === id){
                  dataLoad.dataQueued.splice(dataLoad.dataQueued.indexOf(data),1);
                  event.currentTarget.textContent = 'add to Queued';
                  event.currentTarget.classList.remove('active');
                  localStorage.setItem('SAVED_CURRENT',JSON.stringify(dataLoad));
                  return;
                }
              }
              dataLoad.dataQueued.push(id);
              event.currentTarget.textContent = 'added to Queued';
              event.currentTarget.classList.add('active');
              localStorage.setItem('SAVED_CURRENT',JSON.stringify(dataLoad));
              
              if(dataLoad.dataPage === 'home'){
                console.log('HOME PAGE');
                return;
              }
              console.log('LIBRARY PAGE');
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

