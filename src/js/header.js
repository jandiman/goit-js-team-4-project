import { movieDetail } from "./movie-api";

const navHeader = document.querySelector('#nav');
const activeHeader = document.querySelectorAll('.page');
const btnHeader = document.querySelector('#header-option');
const headerBg = document.querySelector('.header');
const contentEl = document.querySelector('#content');
const pageNav = document.querySelector('#pageNumbers');

headerBg.style.backgroundColor = "$_backgroundImage";

// navigation style change change active
navHeader.addEventListener('click', (event)=>{
    // target specific event

    if(event.target.href.indexOf('#') <= 0){
        // condition is true
        // run early return
        return;
    }

    if(document.querySelector('.bad-result')){
        document.querySelector('.bad-result').remove();
    }

    // stop from loading/refreshing
    event.preventDefault();

    document.querySelector('title').textContent = "My Library";

    // remove existed active class
    activeHeader.forEach(Element => {
        Element.classList.remove('active');
    })

    // add active class
    // target the event classname
    event.target.classList.add('active');

    // change BG image
    // css overriding method
    headerBg.classList.add('library');

    // removing exist markup
    // creating new Mark up
    contentEl.innerHTML = '';
    pageNav.innerHTML = '';
    btnHeader.innerHTML = 
    `<ul class="list btn-list">
        <li><button type="button" class="btn active" data-watched>WATCHED</button></li>
        <li><button type="button" class="btn" data-queued>QUEUED</button></li>
    </ul>`;

    // create DOM Element
    // after rendering buttons
    const btnWatched = document.querySelector('button[data-watched]');
    const btnQueue = document.querySelector('button[data-queued]');

    data = localStorage.getItem('SAVED_CURRENT');
        console.log(JSON.parse(data));
        data = JSON.parse(data);
        data.dataWatched.forEach((el)=>{
            btnTabRender(el);
        })

    // create event
    // after rendering buttons
    btnWatched.addEventListener('click',(event)=>{
        console.log('watched');

        event.currentTarget.classList.add('active');
        btnQueue.classList.remove('active');

        let data = JSON.parse(localStorage.getItem('SAVED_CURRENT')).dataWatched;
        console.log(!data);
        if(data.length === 0){
            contentEl.innerHTML = "WALAY SULOD ang WATCHED!";
            return;
        }

        contentEl.innerHTML = '';


        data.forEach((el)=>{
            console.log(data);
            btnTabRender(el);
        })

        // btnTabRender(data.currentWatch);
    });
    btnQueue.addEventListener('click', event =>{
        console.log('queue');
        
        event.currentTarget.classList.add('active');
        btnWatched.classList.remove('active');
        

        let data = JSON.parse(localStorage.getItem('SAVED_CURRENT')).dataQueued;
        console.log(data);
        if(data.length === 0){
            contentEl.innerHTML = "WALAY SULOD ang QUEUE!";
            return;
        }

        contentEl.innerHTML = '';
        
        console.log(data)
        data.forEach((data)=>{
            console.log(data);
            btnTabRender(data);
        });

        // btnTabRender(data.currentQueue);
    })
});

async function btnTabRender(data1) {
            try{
            // calling data details of ids
            const data = await movieDetail(data1);
            // rendering markup
            contentEl.insertAdjacentHTML('beforeend',renderItemFromLibrary(data));
            }catch(err){
                console.log(err);
            }
}

function renderItemFromLibrary(data) {
    // image link URL
    const IMAGE_URL = 'https://image.tmdb.org/t/p/w500';
    // destructing keys
    const { 
        id, 
        title, 
        genres, 
        poster_path, 
        release_date,
        vote_average,

    } = data;
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
                          <li>|<span>${parseInt(release_date)}</span>
                          </li>
                          <li><span class="btn-page active">${(`${vote_average}`).padEnd(1,'0')}</span></li>
                        </ul> 
                      </div> 
                  </a>
                `;
  }