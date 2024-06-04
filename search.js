document.addEventListener('DOMContentLoaded', () => {
    const recipeContainer = document.querySelector('.recipe-container');
    const recipeDetailContent = document.querySelector('.recipe-details-content');
    const recipeCloseBtn = document.querySelector('.recipe-close-btn');
  
    // Function to fetch recipes based on the search query
    const fetchRecipes = async (query) => {
      recipeContainer.innerHTML = "<h2>Fetching your recipes...</h2>";
      const data = await fetch(`https://www.themealdb.com/api/json/v1/1/search.php?s=${query}`);
      const response = await data.json();
  
      recipeContainer.innerHTML = "";
      if (response.meals) {
        response.meals.forEach(meal => {
          const recipeDiv = document.createElement('div');
          recipeDiv.classList.add('recipe');
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
  
          recipeContainer.appendChild(recipeDiv);
        });
      } else {
        recipeContainer.innerHTML = "<h2>No recipes found. Please try a different search term.</h2>";
      }
    }
  
    // Open recipe popup
    const openRecipePopup = (meal) => {
      const ingredients = [];
      for (let i = 1; i <= 20; i++) {
        if (meal[`strIngredient${i}`]) {
          ingredients.push(`${meal[`strIngredient${i}`]} - ${meal[`strMeasure${i}`]}`);
        } else {
          break;
        }
      }
  
      recipeDetailContent.innerHTML = `
        <h2>${meal.strMeal}</h2>
        <img src="${meal.strMealThumb}" alt="${meal.strMeal}">
        <p><strong>Ingredients:</strong></p>
        <ul>
          ${ingredients.map(ingredient => `<li>${ingredient}</li>`).join('')}
        </ul>
        <p><strong>Instructions:</strong></p>
        <p>${meal.strInstructions}</p>
        <a href="${meal.strYoutube}" target="_blank">Watch Video</a>
      `;
      recipeDetailContent.parentElement.style.display = "block";
    }
  
    // Close recipe popup
    recipeCloseBtn.addEventListener('click', () => {
      recipeDetailContent.parentElement.style.display = "none";
    });
  
    // Get search query from URL parameters
    const urlParams = new URLSearchParams(window.location.search);
    const query = urlParams.get('query');
    if (query) {
      fetchRecipes(query);
    } else {
      recipeContainer.innerHTML = "<h2>Please enter a search term.</h2>";
    }
  
    // Event listener for header search form
    const searchBoxHeader = document.querySelector('header .searchBox');
    const searchBtnHeader = document.querySelector('header .searchBtn');
  
    searchBtnHeader.addEventListener('click', (e) => {
      e.preventDefault();
      const searchInput = searchBoxHeader.value.trim();
      if (searchInput) {
        window.location.href = `search-results.html?query=${encodeURIComponent(searchInput)}`;
      } else {
        alert("Please enter a search term.");
      }
    });
  });
  