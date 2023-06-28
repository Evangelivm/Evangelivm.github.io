// Obtener todas las imágenes de diapositivas
const slides = document.querySelectorAll('.slide');

// Mostrar la primera imagen al cargar la página
slides[0].classList.add('active');

let currentSlide = 0;

// Función para cambiar de diapositiva
function nextSlide() {
  // Ocultar la diapositiva actual
  slides[currentSlide].classList.remove('active');

  // Incrementar el índice de la diapositiva actual
  currentSlide = (currentSlide + 1) % slides.length;

  // Mostrar la siguiente diapositiva
  slides[currentSlide].classList.add('active');
}

// Cambiar de diapositiva cada 3 segundos (3000 milisegundos)
setInterval(nextSlide, 3000);

