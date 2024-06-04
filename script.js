document.addEventListener('DOMContentLoaded', () => {
  const searchBoxHeader = document.querySelector('header .searchBox');
  const searchBtnHeader = document.querySelector('header .searchBtn');
  const searchBoxMain = document.querySelector('.main-search .searchBox');
  const searchBtnMain = document.querySelector('.main-search .searchBtn');
  const featuredContainer = document.querySelector('.featured-container');

  // Function to redirect to the search results page with the query as a parameter
  const redirectToSearchResults = (query) => {
    window.location.href = `search-results.html?query=${encodeURIComponent(query)}`;
  }

  // Event listeners for the search forms
  searchBtnHeader.addEventListener('click', (e) => {
    e.preventDefault();
    const searchInput = searchBoxHeader.value.trim();
    if (searchInput) {
      redirectToSearchResults(searchInput);
    } else {
      alert("Please enter a search term.");
    }
  });

  searchBtnMain.addEventListener('click', (e) => {
    e.preventDefault();
    const searchInput = searchBoxMain.value.trim();
    if (searchInput) {
      redirectToSearchResults(searchInput);
    } else {
      alert("Please enter a search term.");
    }
  });

  // Fetch random recipes for featured section
  const fetchRandomRecipes = async () => {
    featuredContainer.innerHTML = "<h2>Loading featured recipes...</h2>";
    const promises = Array.from({ length: 6 }, () => fetch(`https://www.themealdb.com/api/json/v1/1/random.php`).then(res => res.json()));
    const responses = await Promise.all(promises);

    featuredContainer.innerHTML = "";
    responses.forEach(response => {
      const meal = response.meals[0];
      const recipeDiv = document.createElement('div');
      recipeDiv.classList.add('featured-recipe');
      recipeDiv.innerHTML = `
        <img src="${meal.strMealThumb}" alt="${meal.strMeal}">
        <h3>${meal.strMeal}</h3>
        <p><span>${meal.strArea}</span> Dish</p>
        <p>It belongs to <span>${meal.strCategory}</span></p>
      `;

      const button = document.createElement('button');
      button.textContent = "View Recipe";
      recipeDiv.appendChild(button);

      button.addEventListener('click', () => {
        openRecipePopup(meal);
      });

      featuredContainer.appendChild(recipeDiv);
    });
  }

  // Initialize featured recipes
  fetchRandomRecipes();
});
