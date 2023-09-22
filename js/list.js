import { createCard } from "./cards.js";

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
  const heartButtons = document.querySelectorAll('.heart-button');
  heartButtons.forEach((button, index) => {
    button.addEventListener('click', function() {
      const card = button.closest('.card');
      const genre = card.querySelector('.tag-red').textContent;
      const title = card.querySelector('h2').textContent;
      const image = card.querySelector('.card__image').src;
  
      // Get the poster image link corresponding to the clicked button
  
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
