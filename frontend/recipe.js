document.addEventListener("DOMContentLoaded", async () => {

    const API_KEY = "d4d566d7a8e44533b61dd0506782f20e";

    const params = new URLSearchParams(window.location.search);
    const recipeId = params.get("id");

    try {

        const response = await fetch(
            `https://api.spoonacular.com/recipes/${recipeId}/information?apiKey=${API_KEY}`
        );

        const recipe = await response.json();

        console.log(recipe);

        //---------------- Основна інформація ----------------//

        document.getElementById("recipe-title").textContent = recipe.title;

        document.getElementById("recipe-image").src = recipe.image;
        document.getElementById("recipe-image").alt = recipe.title;

        document.getElementById("recipe-summary").innerHTML =
            recipe.summary || "Опис відсутній.";

        document.getElementById("recipe-time").textContent =
            recipe.readyInMinutes ?? "-";

        document.getElementById("recipe-servings").textContent =
            recipe.servings ?? "-";

        document.getElementById("recipe-likes").textContent =
            recipe.aggregateLikes ?? 0;

        document.getElementById("recipe-vegetarian").textContent =
            recipe.vegetarian ? "Так" : "Ні";

        document.getElementById("recipe-vegan").textContent =
            recipe.vegan ? "Так" : "Ні";

        document.getElementById("recipe-gluten").textContent =
            recipe.glutenFree ? "Так" : "Ні";

        document.getElementById("recipe-dairy").textContent =
            recipe.dairyFree ? "Так" : "Ні";

        document.getElementById("recipe-healthy").textContent =
            recipe.veryHealthy ? "Так" : "Ні";

        document.getElementById("recipe-cheap").textContent =
            recipe.cheap ? "Так" : "Ні";

        //---------------- Джерело ----------------//

        const source = document.getElementById("recipe-source");

        if (recipe.sourceUrl) {
            source.href = recipe.sourceUrl;
            source.textContent = "Перейти до оригінального рецепта";
        } else {
            source.textContent = "Немає";
            source.removeAttribute("href");
        }

        //---------------- Інгредієнти ----------------//

        const ingredientsList = document.getElementById("ingredients-list");
        ingredientsList.innerHTML = "";

        if (recipe.extendedIngredients.length > 0) {

            recipe.extendedIngredients.forEach(ingredient => {

                ingredientsList.innerHTML += `
                    <li>${ingredient.original}</li>
                `;

            });

        } else {

            ingredientsList.innerHTML = "<li>Немає інформації</li>";

        }

        //---------------- Покрокове приготування ----------------//

        const stepsList = document.getElementById("recipe-steps");
        stepsList.innerHTML = "";

        if (
            recipe.analyzedInstructions &&
            recipe.analyzedInstructions.length > 0
        ) {

            recipe.analyzedInstructions[0].steps.forEach(step => {

                stepsList.innerHTML += `
                    <li>${step.step}</li>
                `;

            });

        } else {

            stepsList.innerHTML = "<li>Інструкція відсутня.</li>";

        }

        //---------------- Обладнання ----------------//

        const equipmentList = document.getElementById("equipment-list");
        equipmentList.innerHTML = "";

        const equipmentSet = new Set();

        if (
            recipe.analyzedInstructions &&
            recipe.analyzedInstructions.length > 0
        ) {

            recipe.analyzedInstructions[0].steps.forEach(step => {

                step.equipment.forEach(item => {
                    equipmentSet.add(item.name);
                });

            });

        }

        if (equipmentSet.size > 0) {

            equipmentSet.forEach(item => {

                equipmentList.innerHTML += `
                    <li>${item}</li>
                `;

            });

        } else {

            equipmentList.innerHTML = "<li>Не вказано</li>";

        }

        //---------------- Типи страв ----------------//

        const dishTypes = document.getElementById("dish-types");
        dishTypes.innerHTML = "";

        if (recipe.dishTypes.length > 0) {

            recipe.dishTypes.forEach(type => {

                dishTypes.innerHTML += `
                    <li>${type}</li>
                `;

            });

        } else {

            dishTypes.innerHTML = "<li>Не вказано</li>";

        }

        //---------------- Кухні ----------------//

        const cuisines = document.getElementById("cuisines");
        cuisines.innerHTML = "";

        if (recipe.cuisines.length > 0) {

            recipe.cuisines.forEach(cuisine => {

                cuisines.innerHTML += `
                    <li>${cuisine}</li>
                `;

            });

        } else {

            cuisines.innerHTML = "<li>Не вказано</li>";

        }

        //---------------- Дієти ----------------//

        const diets = document.getElementById("diets");
        diets.innerHTML = "";

        if (recipe.diets.length > 0) {

            recipe.diets.forEach(diet => {

                diets.innerHTML += `
                    <li>${diet}</li>
                `;

            });

        } else {

            diets.innerHTML = "<li>Не вказано</li>";

        }

        //---------------- Теги ----------------//

        const occasions = document.getElementById("occasions");
        occasions.innerHTML = "";

        if (recipe.occasions.length > 0) {

            recipe.occasions.forEach(occasion => {

                occasions.innerHTML += `
                    <li>${occasion}</li>
                `;

            });

        } else {

            occasions.innerHTML = "<li>Не вказано</li>";

        }

    } catch (error) {

        console.error(error);

        document.body.innerHTML = `
            <h1>Помилка завантаження рецепта.</h1>
        `;

    }

});