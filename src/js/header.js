import { movieDetail } from "./movie-api";
import renderItem from "./dataStore";

const navHeader = document.querySelector('#nav');
const activeHeader = document.querySelectorAll('.page');
const btnHeader = document.querySelector('#header-option');
const headerBg = document.querySelector('.header');
const contentEl = document.querySelector('#content');
const pageNav = document.querySelector('#pageNumbers');

window.addEventListener('DOMContentLoaded',()=>{
    if(!localStorage.getItem('SAVED_CURRENT')){
        return;
    }

    const setDefault = {
        currentPage: 'home', // load to recent page
        currentTheme: 'system',
        currentWatch: [],
        currentQueue: [], // Theme set either dark or normal
    };
})

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

    // create event
    // after rendering buttons
    btnWatched.addEventListener('click',(event)=>{
        console.log('watched');

        event.currentTarget.classList.add('active');
        btnQueue.classList.remove('active');

        let data = localStorage.getItem('SAVED_CURRENT');
        console.log(JSON.parse(data));
        if(!data){
            contentEl.innerHTML = "WALAY SULOD ang WATCHED!";
            return;
        }
        data = JSON.parse(data);
        data.dataWatched.forEach((el)=>{
            btnTabRender(el);
        })

        // btnTabRender(data.currentWatch);
    });
    btnQueue.addEventListener('click', event =>{
        console.log('queue');
        
        event.currentTarget.classList.add('active');
        btnWatched.classList.remove('active');
        

        let data = localStorage.getItem('SAVED_CURRENT');
        console.log(JSON.parse(localStorage.getItem('SAVED_CURRENT')));
        if(!data){
            contentEl.innerHTML = "WALAY SULOD ang QUEUE!";
            return;
        }
        data = JSON.parse(data);
        
        console.log(data.dataQueued)
        data.dataQueued.forEach((data)=>{
            console.log(data);
            btnTabRender(data);
        });

        // btnTabRender(data.currentQueue);
    })
});

async function btnTabRender(data1) {
            try{
            contentEl.innerHTML = '';
            // calling data details of ids
            const data = await movieDetail(data1);
            // rendering markup
            contentEl.insertAdjacentHTML('beforeend',renderItem(data));
            }catch(err){
                console.log(err);
            }
}