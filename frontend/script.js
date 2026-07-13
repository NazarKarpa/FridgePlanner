document.addEventListener("DOMContentLoaded", () => {
    console.log("JS працює");


    const productInput = document.getElementById("productInput");
    const searchBtn = document.querySelector(".button-search");
    const resultContainer = document.querySelector(".result-container");


    //-----------------API---------------//

    const API_KEY = "d4d566d7a8e44533b61dd0506782f20e";

    searchBtn.addEventListener("click", async () => {

        const ingredients = productInput.value;

        const response = await fetch(
            `https://api.spoonacular.com/recipes/findByIngredients?ingredients=${ingredients}&number=5&apiKey=${API_KEY}`
        );

        const recipes = await response.json();
        renderRecipes(recipes);

    });

    //-----------------card---------------//

function createRecipeCard(recipe) {

    const missingIngredients = recipe.missedIngredients
        .map(ingredient => `<li>${ingredient.name}</li>`)
        .join("");

    return `
        <div class="flip-card">

            <div class="flip-card__inner">

                <div class="flip-card__front">

                    <div class="image-wrapper">

                        <img class="recipe-image"
                            src="${recipe.image}"
                            alt="${recipe.title}">

                        <div class="card-badges">

                            <span class="badge likes">
                                ❤️ ${recipe.likes}
                            </span>

                            <span class="badge missing">
                                ❌ ${recipe.missedIngredientCount}
                            </span>

                        </div>

                    </div>

                    <div class="recipe-info">

                        <h3 class="recipe-title">
                            ${recipe.title}
                        </h3>

                        <div class="recipe-stats">

                            <span>✅ ${recipe.usedIngredientCount} продуктів</span>

                            <span>🍽️ Рецепт</span>

                        </div>

                    </div>

                </div>

                <div class="flip-card__back">

                    <h2>Не вистачає</h2>

                    <ul class="missing-list">
                        ${missingIngredients}
                    </ul>

                    <button class="recipe-button"
                            data-id="${recipe.id}">
                        Переглянути рецепт
                    </button>

                </div>

            </div>

        </div>
    `;
}

    function renderRecipes(recipes) {

        resultContainer.innerHTML = "";

        recipes.forEach(recipe => {
            resultContainer.innerHTML += createRecipeCard(recipe);
        });
    }

});