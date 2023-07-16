let search = document.querySelector('.search-box');

document.querySelector('#search-icon').onclick = ()=> {
    search.classList.toggle('active');
    menu.classList.remove('active');
}

let menu = document.querySelector('.navbar');

document.querySelector('#menu-icon').onclick = ()=> {
    menu.classList.toggle('active');
    search.classList.remove('active');
}
// Hide Menu And Search Box On Sctoll
window.onscroll = () => {
    enu.classList.remove('active');
    search.classList.remove('active');
}
// Header
let header = document.querySelector('header');

window.addEventListener('scroll' , () => {
    header.classList.toggle('shadow', window.scrollY > 0);
});

// slider

$(".slide img").on("click", function () {
	$(this).toggleClass("zoomed");
	$(".overlay").toggleClass("active");
});
