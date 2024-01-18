import {
  movieSearch, //search API
  movieDetail, //get details by ID
  movieTrend, //default load API
} from './movie-api.js';
import { Notify } from 'notiflix';
import * as basicLightbox from 'basiclightbox';
const instance = basicLightbox.create(`<span class="loader"></span>`);


const contentEl = document.querySelector('.content');
const searchEl = document.querySelector('#search___form');
const searchBox = document.querySelector('#header-option');
const pageListEl = document.querySelector('#pageNumbers');
const defaults = {
  time_window: 'day',
  data: 'trend',
  page: 1,
  adult: 'false',
  sort: 'created_at.asc',
  lang: 'en-US',
};
let currentOpen = '';



async function movieRender() {
  try {
    contentEl.innerHTML = '';
    pageListEl.innerHTML = '';
    currentOpen = 'binuksan';
    instance.show();
    const data = await movieSearch(defaults);
    instance.close();
    // get results
    // get total_pages
    const { results, total_pages, page} = data;
    console.log(total_pages);
    if (results.length == 0) {
      if (!document.querySelector('.bad-result')) {
        searchBox.insertAdjacentHTML(
          'afterend',
          '<p class="bad-result">Search result not successful. Enter the correct movie name and title</p>'
        );
        return;
      }
      return;
    }

    // empty the content

    // searching details for id
    results
      .map(async ({ id }) => {
        try {
          // calling data details of ids
          const data = await movieDetail(id);
          // rendering markup
          contentEl.insertAdjacentHTML('beforeend', renderItem(data));
        } catch (err) {
          console.log(err);
        }
      })
      .join('');

    pageListEl.innerHTML = '';
    pageListEl.insertAdjacentHTML(
      'beforeend',
      `
        <li><button type="button" class="btn-page" data-prev>&larr;</button></li>
        ${pageNav(total_pages)}
        <li><button type="button" class="btn-page" data-next>&rarr;</button></li>`
    );
    buttonNext(movieRender, page, total_pages+1);
    buttonPrev(movieRender, page);
  } catch (err) {
    console.log(err);
  }
}

pageListEl.addEventListener('click', event => {
  console.log(event.target.nodeName);
  if (event.target.nodeName !== 'SPAN') {
    return;
  }
  defaults.page = event.target.dataset.page;
  console.log(event.target.dataset.page);

  if (currentOpen !== '') {
    movieRender();
    return;
  }
    loadTrend();
});

searchEl.addEventListener('submit', event => {
  event.preventDefault();

  if (!document.getElementById('search_item').value.trim()) {
    Notify.warning('No Inputted Data', {
      position: 'center-top',
    });
    return;
  }
  // changing the key
  // getting a value from markup
  defaults.data = document.getElementById('search_item').value;
  // call function after changing data
  if (document.querySelector('.bad-result')) {
    document.querySelector('.bad-result').remove();
  }
  defaults.page = 1;

  movieRender();

  console.log(JSON.stringify(defaults));
});

const loadTrend = async () => {
  try {
    instance.show();
    const data = await movieTrend(defaults);
    data.total_pages = 50;
    contentEl.innerHTML = '';
    // get results
    // get total_pages
    const { results, total_pages, page } = data;
    // console.log(results);
    // console.log(total_pages);

    results
      .map(async ({ id }) => {
        try {
          // calling data details of ids
          const data = await movieDetail(id);
          // rendering markup
          contentEl.insertAdjacentHTML('beforeend', renderItem(data));
        } catch (err) {
          console.log(err);
        }
      })
      .join('');
    
    pageListEl.innerHTML = '';
    pageListEl.insertAdjacentHTML(
      'beforeend',
      `
        <li><button type="button" class="btn-page" data-prev>&larr;</button></li>
        ${pageNav(total_pages)}
        <li><button type="button" class="btn-page" data-next>&rarr;</button></li>`
    );

    buttonNext(loadTrend, page, total_pages+1);
    buttonPrev(loadTrend, page);
    instance.close();

    if(defaults.page !== 1){
      return;
    }
    
    Notify.success('All Trend movies are loaded!', {
      position: 'center-center',
      clickToClose: true,
    });
  } catch (err) {
    console.log(err);
  }
}

window.addEventListener('DOMContentLoaded', loadTrend);

function renderItem(data) {
  // image link URL
  const IMAGE_URL = 'https://image.tmdb.org/t/p/w500';
  // destructing keys
  const { id, title, poster_path, genres, release_date } = data;
  return `<a href="${
    poster_path
      ? IMAGE_URL + poster_path
      : 'https://static.wikia.nocookie.net/ideas/images/6/66/FoxAndroidTM2%27s_No_Poster.jpg'
  }" class="link">
                    <div class="poster-card">
                      <img src="${
                        poster_path
                          ? IMAGE_URL + poster_path
                          : 'https://static.wikia.nocookie.net/ideas/images/6/66/FoxAndroidTM2%27s_No_Poster.jpg'
                      }" alt="${title}" class="poster-image" id="${id}" />
                      <h4 class="poster-title">${title}</h4>
                      <ul class="list genre-list">${genres
                        .map(({ name }) => {
                          return `<li><span>${name}</span></li>`;
                        })
                        .join('')}
                        <li>|
                            <span>${parseInt(release_date)}</span>
                        </li>
                      </ul> 
                    </div>
                </a>
              `;
}

const pageNav = pages => {
  let storedList = '';
  let numPage = 1;
  let countdown = 0;
  switch (parseInt(defaults.page)) {
    case 1:
    case 2:
    case 3:
    case 4:
      break;
    default:
      numPage = parseInt(defaults.page) - 2;
      storedList += `
                <li class="page-edge">
                <span class="btn-page" data-page="1">1</span>
                </li>
                <li class="page-edge">...</li>`;
      break;
  }
  for (let i = numPage; i <= pages; i++) {
    let currentPage = '';
    if (i === parseInt(defaults.page)) {
      currentPage += ' active';
    }
    storedList += `
            <li>
            <span class="btn-page${currentPage}" data-page="${i}">${i}</span>
            </li>`;
    countdown += 1;
    if (countdown === 5) {
      storedList += `
                <li class="page-edge">...</li>
                <li  class="page-edge">
                <span class="btn-page page-edge" data-page="${pages}">${pages}</span>
                </li>`;
      break;
    }
  }

  return storedList;
};

function buttonNext(callback, p, tp){
  const button = document.querySelector('button[data-next]');
  button.addEventListener('click',()=>{
    defaults.page = p + 1;
    if(defaults.page === tp){
      defaults.page = p;
      Notify.failure('exceeded maximum page!',{});
      return;
    }
    return callback();
  })
}
function buttonPrev(callback, p){
  const button = document.querySelector('button[data-prev]');

  button.addEventListener('click',()=>{
    defaults.page = p - 1;
    if(defaults.page === 0){
      defaults.page = p;
      Notify.failure('exceeded minimum page!',{});
      return;
    }
    return callback();
  })
}
export default renderItem;
