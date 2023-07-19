document.addEventListener("DOMContentLoaded", function () {
  const favoritesLink = document.querySelector(".my-header__title2");
  const broadcastChannel = new BroadcastChannel("favoritesChannel");

  function updateFavoritesCount() {
    const dataFromLocalStorage = JSON.parse(localStorage.getItem('myData'));
    if (dataFromLocalStorage !== null) {
      const favoritesCount = dataFromLocalStorage.length;
      if (favoritesCount === 0) {
        favoritesLink.textContent = "Favorites";
      } else {
        favoritesLink.textContent = `Favorites (${favoritesCount})`;
      }
    } else {
      favoritesLink.textContent = "Favorites";
    }
  }

  updateFavoritesCount();

  broadcastChannel.onmessage = updateFavoritesCount;

  window.addEventListener("beforeunload", function () {
    broadcastChannel.close();
  });

  // Agregar evento storage para detectar cambios en el localStorage
  window.addEventListener("storage", function (event) {
    if (event.key === "myData") {
      broadcastChannel.postMessage("update"); // Enviar mensaje a otras pestañas
      updateFavoritesCount(); // Actualizar el contador en la misma pestaña
    }
  });
});
