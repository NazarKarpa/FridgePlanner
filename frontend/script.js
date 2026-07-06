document.addEventListener("DOMContentLoaded", () => {
    console.log("JS працює");


    const productInput = document.getElementById("productInput");
    const searchBtn = document.querySelector(".button-search");


        //-----------------API---------------//

    const API_KEY = "d4d566d7a8e44533b61dd0506782f20e";

    searchBtn.addEventListener("click", async () => {

        const ingredients = productInput.value;

        const response = await fetch(
            `https://api.spoonacular.com/recipes/findByIngredients?ingredients=${ingredients}&number=5&apiKey=${API_KEY}`
        );

        const recipes = await response.json();

        console.log(recipes);
    });

});