document.addEventListener("DOMContentLoaded", async () => {
    try {
      const response = await fetch("../data/data.json");
      const data = await response.json();
  
      // Display initial listings for popular items
      displayListings(getRandomItems(data.houses, 3), 'popular-houses-list');
      displayListings(getRandomItems(data.cars, 3), 'popular-cars-list');
  
      // Display all listings for houses and cars
      displayListings(data.houses, 'houses-list');
      displayListings(data.cars, 'cars-list');
  
      // Setup navigation and filters
      setupCategoryNavigation();
      setupFilters();
    } catch (error) {
      console.error('Error loading data:', error);
    }
  });
  
  // Function to get a random selection of items
  function getRandomItems(array, numItems) {
    if (array.length <= numItems) return array;
    let shuffled = array.sort(() => 0.5 - Math.random());
    return shuffled.slice(0, numItems);
  }
  
  // Function to display listings in the given container
  function displayListings(items, containerId) {
    const container = document.getElementById(containerId);
    if (!container) return;
    container.innerHTML = '';  // Clear previous listings
  
    items.forEach(item => {
      const itemDiv = document.createElement('div');
      itemDiv.classList.add('listing');
      itemDiv.innerHTML = `
        <img src="${item.image}" alt="${item.title || item.name}">
        <h3>${item.title || item.name}</h3>
        <p>Location: ${item.location}</p>
        <p>Price: $${item.price_per_month || item.price_per_day || item.price_per_event}</p>
        <p>${item.availability ? "Available" : "Not Available"}</p>
      `;
      container.appendChild(itemDiv);
    });
  }
  
  // Function to setup the category navigation
  function setupCategoryNavigation() {
    const navLinks = document.querySelectorAll('nav ul li');
    navLinks.forEach(link => {
      link.addEventListener('click', () => {
        const category = link.getAttribute('data-category');
        showCategory(category);
  
        // Highlight the active category
        navLinks.forEach(l => l.classList.remove('active'));
        link.classList.add('active');
      });
    });
  }
  
  // Function to display the selected category
  function showCategory(category) {
    const sections = document.querySelectorAll('.category');
    sections.forEach(section => section.style.display = 'none');  // Hide all sections
  
    const target = document.getElementById(category);
    if (target) target.style.display = 'block';  // Show the selected section
  }
  
  // Function to setup filters for houses and cars
  function setupFilters() {
    const houseType = document.getElementById("house-type-filter");
    const housePrice = document.getElementById("house-price-filter");
    const carType = document.getElementById("car-type-filter");
    const carPrice = document.getElementById("car-price-filter");
  
    if (houseType && housePrice) {
      houseType.addEventListener("change", applyHouseFilters);
      housePrice.addEventListener("change", applyHouseFilters);
    }
  
    if (carType && carPrice) {
      carType.addEventListener("change", applyCarFilters);
      carPrice.addEventListener("change", applyCarFilters);
    }
  }
  
  // Function to apply house filters
  async function applyHouseFilters() {
    try {
      const response = await fetch("../data/data.json");
      const data = await response.json();
  
      let filteredItems = data.houses;
      const selectedType = document.getElementById("house-type-filter").value;
      const selectedPrice = document.getElementById("house-price-filter").value;
  
      if (selectedType !== "all") {
        filteredItems = filteredItems.filter(item => item.type === selectedType);
      }
  
      if (selectedPrice !== "all") {
        filteredItems = filteredItems.filter(item => item.price_per_month == selectedPrice);
      }
  
      displayListings(filteredItems, 'houses-list');
    } catch (error) {
      console.error('Error filtering houses:', error);
    }
  }
  
  // Function to apply car filters
  async function applyCarFilters() {
    try {
      const response = await fetch("../data/data.json");
      const data = await response.json();
  
      let filteredItems = data.cars;
      const selectedType = document.getElementById("car-type-filter").value;
      const selectedPrice = document.getElementById("car-price-filter").value;
  
      if (selectedType !== "all") {
        filteredItems = filteredItems.filter(item => item.type.toLowerCase() === selectedType.toLowerCase());
      }
  
      if (selectedPrice !== "all") {
        filteredItems = filteredItems.filter(item => item.price_per_day === parseInt(selectedPrice));
      }
  
      displayListings(filteredItems, 'cars-list');
    } catch (error) {
      console.error('Error filtering cars:', error);
    }
  }
  