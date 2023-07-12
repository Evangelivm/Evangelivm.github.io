document.addEventListener('DOMContentLoaded', () => {
    const searchButton = document.getElementById('search-button');
    const searchInput = document.getElementById('search-input');

    listenerElement(searchButton, searchInput);
});

export function listenerElement(searchButton, searchInput) {
    searchButton.addEventListener('click', () => {
        const searchTerm = searchInput.value;
        if (searchTerm.trim() !== '') {
            const encodedSearchTerm = encodeURIComponent(searchTerm);
            window.location.href = `result/index.html?category=${encodedSearchTerm}`;
        }
    });
}


  