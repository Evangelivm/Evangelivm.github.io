// Get the data stored in localStorage
const existingData = JSON.parse(localStorage.getItem('myData'));

// Check if there are any stored data
if (existingData && existingData.length > 0) {
  const container = document.querySelector('.container2');

  // Function to create a card
  function createCardElement(data) {
    const card = document.createElement('div');
    card.classList.add('card2');

    const eraseButton = document.createElement('button');
    eraseButton.textContent = 'Erase';
    eraseButton.classList.add('erase-button');
    card.appendChild(eraseButton);

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

    // Add an event to delete the card when clicking the "Erase" button
    eraseButton.addEventListener('click', function () {
      const index = existingData.findIndex((item) => item.title === data.title && item.genre === data.genre && item.image === data.image);
      if (index !== -1) {
        existingData.splice(index, 1); // Remove the card from the data array
        localStorage.setItem('myData', JSON.stringify(existingData)); // Update the data in localStorage
        rebuildCardList(); // Rebuild the list of cards
      }
    });

    return card;
  }

  // Function to rebuild the list of cards
  function rebuildCardList() {
    container.innerHTML = ''; // Clear the card container

    existingData.forEach((data) => {
      const card = createCardElement(data);
      container.appendChild(card);
    });
  }

  // Build the initial list of cards
  rebuildCardList();
} else {
  const container = document.querySelector('.container2');
  const noFavoritesMessage = document.createElement('h1');
  noFavoritesMessage.textContent = 'No favorites';
  container.appendChild(noFavoritesMessage);
}
