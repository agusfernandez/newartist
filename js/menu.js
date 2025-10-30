const toggle = document.querySelector('.toggle');
const dropdown = document.querySelector('.dropdown-menu');

if (toggle) {
    toggle.addEventListener('click', () => {
        dropdown.classList.toggle('show-dropdown');
        toggle.classList.toggle('open');
    });
}
