
const mainMenu = document.querySelector('.mainMenu');
const closeMenu = document.querySelector('.closeMenu');
const openMenu = document.querySelector('.openMenu');

openMenu.addEventListener('click',show);
closeMenu.addEventListener('click',close);

function show(){
    mainMenu.style.display = 'flex';
    mainMenu.style.top = '0';
}
function close(){
    mainMenu.style.top = '-110%';
}
let content = document.getElementById('text');
let hero = document.querySelector('.hero');
window.addEventListener('scroll', scrollMove());
function scrollMove(){
let value = window.scrollY;
hero.style.left = value * 0.25 + 'px'
content.style.marginRight = value * 4 +'px';
//content.style.marginTop = value * 1.5 +'px';
}
