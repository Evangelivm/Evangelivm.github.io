const slides = document.querySelectorAll('.slide');
slides[0].classList.add('active');

let currentSlide = 0;

function nextSlide() {
  slides[currentSlide].classList.remove('active');
  currentSlide = (currentSlide + 1) % slides.length;
  slides[currentSlide].classList.add('active');
}

setInterval(nextSlide, 3000);

fetch('data.json')
  .then(response => response.json())
  .then(data => {
    const cardImage = document.querySelector('.card__image');
    const tag = document.querySelector('.tag');
    const title = document.querySelector('h4');
    const plot = document.querySelector('p');
    const userName = document.querySelector('.user__info h5');
    const time = document.querySelector('.user__info small');

    // Actualizar el contenido de los elementos HTML con los datos del JSON
    cardImage.src = data.imageSrc;
    tag.textContent = data.tag;
    title.textContent = data.title;
    plot.textContent = data.plot;
    userName.textContent = data.userName;
    time.textContent = data.time;
  })
  .catch(error => {
    console.error('Error al cargar el JSON:', error);
  });