document.addEventListener("DOMContentLoaded", function () {
    // Get the link for displaying favorites count
    const favoritesLink = document.querySelector(".my-header__title2");
  
    // Create a BroadcastChannel to communicate with other browsing contexts
    const broadcastChannel = new BroadcastChannel("favoritesChannel");
  
    // Function to update the favorites count display
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
  
    // Initial update of favorites count
    updateFavoritesCount();
  
    // Listen for messages from other browsing contexts via BroadcastChannel
    broadcastChannel.onmessage = updateFavoritesCount;
  
    // Close the BroadcastChannel before unloading the page
    window.addEventListener("beforeunload", function () {
      broadcastChannel.close();
    });
  
    // Add a storage event listener to detect changes in localStorage
    window.addEventListener("storage", function (event) {
      if (event.key === "myData") {
        broadcastChannel.postMessage("update"); // Send a message to other tabs
        updateFavoritesCount(); // Update the count in the current tab
      }
    });
  });
  