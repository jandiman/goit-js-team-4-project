const navHeader = document.querySelector('#nav');
const activeHeader = document.querySelectorAll('.page');
const btnHeader = document.querySelector('#header-option');
const headerBg = document.querySelector('.header');

headerBg.style.backgroundColor = "$_backgroundImage";

// navigation style change change active
navHeader.addEventListener('click', (event)=>{
    // target specific event
    if(event.target.href.indexOf('#') <= 0){
        // condition is true
        // run early return
        return;
    }

    // stop from loading/refreshing
    event.preventDefault();
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
    btnHeader.innerHTML = 
    `<ul class="list btn-list">
        <li><button type="button" class="btn active" data-watched>WATCHED</button></li>
        <li><button type="button" class="btn" data-queue>QUEUED</button></li>
    </ul>`;

    const btnWatched = document.querySelector('button[data-watched]');
    const btnQueue = document.querySelector('button[data-queue]');
    btnWatched.addEventListener('click',(event)=>{
        console.log('watched');
        event.currentTarget.classList.add('active');
        btnQueue.classList.remove('active');
    });
    btnQueue.addEventListener('click', event =>{
        console.log('queue');
        event.currentTarget.classList.add('active');
        btnWatched.classList.remove('active');
    })
});
