const selectedCategory = localStorage.getItem("selectedCategory");
const selectedDescription = localStorage.getItem("selectedDescription");



// Fetching the meals from the api throught the category and description from the localStorage
async function selectedmeasls(category) {
    const resp = await fetch(`https://www.themealdb.com/api/json/v1/1/filter.php?c=${category}`);
    const mealsData = await resp.json() 
    displayMeals(mealsData.meals)
}

selectedmeasls(selectedCategory)

// Display meals function
function displayMeals(products){
    const mealDescription = document.getElementById("mealDescription");
    const mealsTitle = document.getElementById("mealTitle");
    const allMeals = document.getElementById("allMeals");

    let cateDesciption =`
    <div class="descritpionBox">
        <h2 id="descTitle">${selectedCategory}</h2> 
        <p>${selectedDescription}</p>
    </div>
    `
    let titleMeal =`
    <h1 class="mealHeading">MEALS</h1>
    <div class="orangeLine"></div>
    `
    let cateData = ""
    products.forEach((prod) => {
        cateData +=`
        <div class="cardsMeals" data-id="${prod.idMeal}">
            <img src="${prod.strMealThumb}" alt="${prod.strMeal}">
            <h5 class="cardTitle">${prod.strMeal}</h5>
        </div>
        `
    });
    mealDescription.innerHTML = cateDesciption;
    mealsTitle.innerHTML = titleMeal;
    allMeals.innerHTML = cateData;

    document.querySelectorAll(".cardsMeals").forEach((card)=>{
        card.addEventListener("click", () => {
            const meal_ID = card.getAttribute("data-id");

            localStorage.setItem("clickedID", meal_ID)

            window.location.href = "details.html";
        })
    })
}