const selectedCategory = localStorage.getItem("selectedCategory");
const selectedDescription = localStorage.getItem("selectedDescription");

console.log(selectedDescription);


// Fetching the meals from the api throught the category and description from the localStorage
async function selectedmeasls(category) {
    const resp = await fetch(`https://www.themealdb.com/api/json/v1/1/filter.php?c=${category}`);
    const mealsData = await resp.json() 
    console.log(mealsData.meals);
    displayMeals(mealsData.meals)
}

selectedmeasls(selectedCategory)

// Display meals function
function displayMeals(){

}