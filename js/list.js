fetch("data.json")
  .then(response => response.json())
  .then(data => {
    const container = document.querySelector('.container');
    const currentURL = window.location.href;
    const url = new URL(currentURL);
    const searchParams = new URLSearchParams(url.search);
    const categoryValue = searchParams.get("category");
    const genreValue = searchParams.get("genre");
    const platformValue = searchParams.get("platform");
    data.result.forEach(item => {
      if (searchParams.get("category") !== null && item.title.toLowerCase().includes(categoryValue.toLowerCase())) {
        createCard(item, container);
      } else if (searchParams.get("platform") !== null && item.streamingInfo && item.streamingInfo.us && item.streamingInfo.us[platformValue]) {
        createCard(item, container);
      } else if (searchParams.get("genre") !== null && item.genres[0]['name'].toLowerCase().includes(genreValue.toLowerCase())) {
        createCard(item, container);
      }
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
      <span class="tag tag-red">${item.genres[0]['name']}</span>
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