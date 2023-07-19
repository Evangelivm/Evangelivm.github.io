import { createCard } from "./cards";

const currentURL = window.location.href;
const urlOne = new URL(currentURL);
const searchParams = new URLSearchParams(urlOne.search);
const categoryValue = searchParams.get("category");
const genreValue = searchParams.get("genre");
const platformValue = searchParams.get("platform");
const container = document.querySelector('.container');

try {
  // Fetch and display data based on the "category" query parameter if it exists
  if (categoryValue !== null) {
    const categoryURL = `https://streaming-availability.p.rapidapi.com/v2/search/title?title=${categoryValue}&country=us&show_type=movie&output_language=en`;
    const categoryOptions = {
      method: 'GET',
      headers: {
        'X-RapidAPI-Key': '84b6a14863msh1ef8faf1704eeccp1c1c7djsn55f4804b3864',
        'X-RapidAPI-Host': 'streaming-availability.p.rapidapi.com'
      }
    };

    const categoryResponse = await fetch(categoryURL, categoryOptions);
    const categoryData = await categoryResponse.json();

    categoryData.result.forEach(item => {
      createCard(item, container);
    });
  }

  // Fetch and display data based on the "platform" query parameter if it exists
  if (platformValue !== null) {
    const platformURL = `https://streaming-availability.p.rapidapi.com/v2/search/basic?country=us&services=${platformValue}&output_language=en&show_type=movie&genre=27&show_original_language=en`;
    const platformOptions = {
      method: 'GET',
      headers: {
        'X-RapidAPI-Key': '84b6a14863msh1ef8faf1704eeccp1c1c7djsn55f4804b3864',
        'X-RapidAPI-Host': 'streaming-availability.p.rapidapi.com'
      }
    };

    const platformResponse = await fetch(platformURL, platformOptions);
    const platformData = await platformResponse.json();

    platformData.result.forEach(item => {
      createCard(item, container);
    });
  }

  // Fetch and display data based on the "genre" query parameter if it exists
  if (genreValue !== null) {
    const genreURL = `https://streaming-availability.p.rapidapi.com/v2/search/basic?country=us&services=netflix%2Cprime%2Cdisney%2Capple&output_language=en&show_type=movie&genre=${genreValue}&show_original_language=en`;
    const genreOptions = {
      method: 'GET',
      headers: {
        'X-RapidAPI-Key': '84b6a14863msh1ef8faf1704eeccp1c1c7djsn55f4804b3864',
        'X-RapidAPI-Host': 'streaming-availability.p.rapidapi.com'
      }
    };

    const genreResponse = await fetch(genreURL, genreOptions);
    const genreData = await genreResponse.json();

    genreData.result.forEach(item => {
      createCard(item, container);
    });
  }

  // Add event listener to heart buttons after creating the cards
  const heartButtons = document.querySelectorAll('.heart-button');
  heartButtons.forEach((button, index) => {
    button.addEventListener('click', function() {
      const card = button.closest('.card');
      const genre = card.querySelector('.tag-red').textContent;
      const title = card.querySelector('h2').textContent;
      const image = card.querySelector('.card__image').src;
  
      // Get the poster image link corresponding to the clicked button
      //const posterURL = data.result[index].posterURLs['342'];
  
      const existingData = JSON.parse(localStorage.getItem('myData')) || [];
  
      const newData = {
        genre,
        title,
        image, // Include the poster link in the newData object
      };
  
      existingData.push(newData);
  
      localStorage.setItem('myData', JSON.stringify(existingData));
  
      button.disabled = true; // Disable the button after clicking it
    });
  });
} catch (error) {
  console.error('Error loading JSON:', error);
}





/*
fetch("data.json")
  .then(response => response.json())
  .then(data => {
    const container = document.querySelector('.container');
    const currentURL = window.location.href;
    const urlOne = new URL(currentURL);
    const searchParams = new URLSearchParams(urlOne.search);
    const categoryValue = searchParams.get("category");
    const genreValue = searchParams.get("genre");
    const platformValue = searchParams.get("platform");
    data.result.forEach((item, index) => {
      if (searchParams.get("category") !== null && item.title.toLowerCase().includes(categoryValue.toLowerCase())) {
        createCard(item, container, index);
      } else if (searchParams.get("platform") !== null && item.streamingInfo && item.streamingInfo.us && item.streamingInfo.us[platformValue]) {
        createCard(item, container, index);
      } else if (searchParams.get("genre") !== null && item.genres[0]['name'].toLowerCase().includes(genreValue.toLowerCase())) {
        createCard(item, container, index);
      }
    });

    // Add event listener to heart buttons after creating the cards
    const heartButtons = document.querySelectorAll('.heart-button');
    heartButtons.forEach((button, index) => {
      button.addEventListener('click', function() {
        const card = button.closest('.card');
        const genre = card.querySelector('.tag-red').textContent;
        const title = card.querySelector('h2').textContent;
        const image = card.querySelector('.card__image').src;
    
        // Obtener el enlace de la imagen del póster correspondiente al botón clicado
        //const posterURL = data.result[index].posterURLs['342'];
    
        const existingData = JSON.parse(localStorage.getItem('myData')) || [];
    
        const newData = {
          genre,
          title,
          image, // Incluir el enlace del póster en el objeto newData
        };
    
        existingData.push(newData);
    
        localStorage.setItem('myData', JSON.stringify(existingData));
    
        button.disabled = true; // Deshabilitar el botón después de hacer clic en él
      });
    });
  })
  .catch(error => {
    console.error('Error loading JSON:', error);
  });



function createCard(item, container) {
  // Create the <div class="card"> element
  const card = document.createElement('div');
  card.classList.add('card');

  // Create the internal content of the <div class="card">
  const cardContent = `
    <div class="card__header">
      <img src="${item.posterURLs['342']}" alt="card__image" class="card__image" width="600">
    </div>
    <div class="card__body2">
      <div class="card__body3">
        <div class="card__tag">
          <span class="tag tag-red">${item.genres[0]['name']}</span>
        </div>
        <div class="card__button">
          <button class="heart-button">&#x2665;</button>
        </div>
      </div>
      <h2>${item.title}</h2>
      <h3>Plot</h3>
      <p>${item.overview}</p>
    </div>
    <div class="card__middle">
      <div class="user">
        <div class="user__info">
          <h5>Available at:</h5>
        </div>
      </div>
    </div>
    <div class="card__footer">
      <div class="user">
        <div class="user__info2">
          <h5>${getPlatformLinks(item.streamingInfo)}</h5>
        </div>
      </div>
    </div>
  `;

  // Assign the content to the <div class="card"> element
  card.innerHTML = cardContent;

  // Add the <div class="card"> element to the container
  container.appendChild(card);
}

function getPlatformLinks(streamingInfo) {
  if (streamingInfo && streamingInfo.us) {
    const platforms = Object.keys(streamingInfo.us);
    const uniquePlatforms = Array.from(new Set(platforms));
    let platformHTML = "";
    uniquePlatforms.forEach(platform => {
      const services = streamingInfo.us[platform];
      const firstService = services[0];
      const serviceName = platform.charAt(0).toUpperCase() + platform.slice(1);
      const serviceLink = firstService.link;
      platformHTML += `<a href="${serviceLink}" target="_blank">${serviceName}</a>, `;
    });
    return platformHTML.slice(0, -2);
  }
  return "No platform";
}


*/