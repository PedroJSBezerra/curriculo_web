import './Particles.js'
let app = document.querySelector('.app')
let button = document.querySelector('.button')
let nav = document.querySelector('.nav')

button.addEventListener('click', () => {
    nav.classList.toggle("open")
    button.classList.toggle("open")
})