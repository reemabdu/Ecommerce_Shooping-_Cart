// Function to search for a specific name in the data
function searchByName(searchTerm) {
    // Convert the search term to lowercase for case-insensitive search
    const lowerSearchTerm = searchTerm.toLowerCase();
  
    // Fetch the data from the JSON file
    fetch('products.json')
      .then(response => response.json())
      .then(data => {
        // Filter the data based on the search term
        const searchResults = data.filter(item => item.name.toLowerCase().includes(lowerSearchTerm));
  
        // Get the container element where the results will be appended
        const container = document.querySelector('.listProduct');
  
        // Clear previous search results
        container.innerHTML = '';
  
        // Display the search results
        if (searchResults.length > 0) {
          console.log('Search results:');
          searchResults.forEach(item => {
            // Create a new item element
            const itemElement = document.createElement('div');
            itemElement.classList.add('item');
  
            // Set the HTML content of the item element
            itemElement.innerHTML = `
            <img src="${item.image}" alt="images">
               <h2>${item.name}</h2>
               <div class="price">${item.price}</div>
               <button class="addCart">
                Add To Cart
               </button>`;
  
            // Append the item element to the container
            container.appendChild(itemElement);
          });
        } else {
          console.log('No results found.');
          // Display a message in the container when no results are found
          container.textContent = 'No results found.';
        }
      })
      .catch(error => {
        console.error('Error fetching data:', error);
      });
  }
  
  // Get the search input element
  const searchInput = document.querySelector('.form-control');
  
  // Add event listener to the search input for input event
  searchInput.addEventListener('input', function(event) {
    const searchTerm = event.target.value.trim();
    searchByName(searchTerm);
  });