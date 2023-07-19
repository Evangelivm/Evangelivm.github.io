// Obtener los datos almacenados en el localStorage
const existingData = JSON.parse(localStorage.getItem('myData'));

// Verificar si existen datos almacenados
if (existingData && existingData.length > 0) {
  const container = document.querySelector('.container2');

  // Función para crear una tarjeta
  function createCardElement(data) {
    const card = document.createElement('div');
    card.classList.add('card2');

    const genre = document.createElement('p');
    genre.classList.add('tag-red');
    genre.textContent = data.genre;
    card.appendChild(genre);

    const title = document.createElement('h2');
    title.textContent = data.title;
    card.appendChild(title);

    const image = document.createElement('img');
    image.src = data.image;
    image.alt = 'Card Image';
    card.appendChild(image);

    const eraseButton = document.createElement('button');
    eraseButton.textContent = 'Erase';
    eraseButton.classList.add('erase-button');
    card.appendChild(eraseButton);

    // Agregar evento para eliminar la tarjeta al hacer clic en el botón "Erase"
    eraseButton.addEventListener('click', function () {
      const index = existingData.findIndex((item) => item.title === data.title && item.genre === data.genre && item.image === data.image);
      if (index !== -1) {
        existingData.splice(index, 1); // Eliminar la tarjeta del array de datos
        localStorage.setItem('myData', JSON.stringify(existingData)); // Actualizar los datos en el localStorage
        rebuildCardList(); // Reconstruir la lista de tarjetas
      }
    });

    return card;
  }

  // Función para reconstruir la lista de tarjetas
  function rebuildCardList() {
    container.innerHTML = ''; // Limpiar el contenedor de tarjetas

    existingData.forEach((data) => {
      const card = createCardElement(data);
      container.appendChild(card);
    });
  }

  // Construir la lista de tarjetas inicial
  rebuildCardList();
} else {
  const container = document.querySelector('.container2');
  const noFavoritesMessage = document.createElement('h1');
  noFavoritesMessage.textContent = 'No favorites';
  container.appendChild(noFavoritesMessage);
}
