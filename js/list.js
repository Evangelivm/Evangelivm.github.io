fetch("data.json")
  .then(response => response.json())
  .then(data => {
    // Iterar sobre los elementos del JSON
    data.result.forEach((item, index) => {  // Acceder a la propiedad "result" del objeto JSON
      const cardImage = document.querySelectorAll(".card__image")[index];
      const genre = document.querySelectorAll(".tag")[index];
      const title = document.querySelectorAll("h2")[index];
      const plot = document.querySelectorAll("p")[index];
      const platform = document.querySelectorAll(".user__info2 h5")[index];

      // Actualizar el contenido de los elementos HTML con los datos del JSON actual
      cardImage.src = item.posterURLs['500'];  // Usar la propiedad "posterURLs" del objeto JSON
      genre.textContent = item.genres[0]['name'];  // Usar la propiedad "tagline" del objeto JSON
      title.textContent = item.title;
      plot.textContent = item.overview;  // Usar la propiedad "overview" del objeto JSON
      // Mostrar el contenido de "streamingInfo" en "platform"
      const streamingInfo = item.streamingInfo;
      if (streamingInfo && streamingInfo.us) {
        const platforms = Object.keys(streamingInfo.us); // Obtener las plataformas disponibles en la región "us"
        let uniquePlatforms = Array.from(new Set(platforms)); // Eliminar las plataformas duplicadas
        let platformHTML = "";
        uniquePlatforms.forEach(platform => {
          const services = streamingInfo.us[platform];
          const firstService = services[0]; // Obtener el primer servicio de la plataforma
          const serviceName = platform.charAt(0).toUpperCase() + platform.slice(1);
          const serviceLink = firstService.link;
          platformHTML += `<a href="${serviceLink}" target="_blank">${serviceName}</a>, `;
        });
        platform.innerHTML = platformHTML.slice(0, -2); // Eliminar la coma y el espacio extra al final
      } else {
        platform.textContent = "No disponible";
      }
    });
  })
  .catch(error => {
    console.error('Error al cargar el JSON:', error);
  });


