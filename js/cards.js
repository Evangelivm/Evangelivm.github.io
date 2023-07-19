// Function to create a card element
export function createCard(item, container) {
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
  
  // Function to get platform links from the streamingInfo object
  export function getPlatformLinks(streamingInfo) {
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