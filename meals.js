const selectedCategory = localStorage.getItem("selectedCategory");
const selectedDescription = localStorage.getItem("selectedDescription");

const menuBtn = document.getElementById("navLogo");
const closeBtn = document.getElementById("close-btn");
const sidebar = document.getElementById("sidebar");

let mealProducts = []
let mealInNav = []

menuBtn.addEventListener("click", () => {
    sidebar.style.right = "0px";
});

closeBtn.addEventListener("click", () => {
    sidebar.style.right = "-350px";
});


async function fetchItemsNav() {
    const navRes = await fetch("https://www.themealdb.com/api/json/v1/1/categories.php");
    const navData = await navRes.json();

    navData.categories.forEach((obj) => {
        mealInNav.push(obj);
    });
    displayItemsNav(mealInNav);
}

fetchItemsNav();


function displayItemsNav(meals) {

    const categoryNav = document.querySelector("#sidebar .items");
    let mealNav = "";

    meals.forEach((product) => {
        mealNav += `
            <p class="mealCategories" data-categoryNav="${product.strCategory}">
                ${product.strCategory}
            </p>
            <hr>
        `;
    });

    categoryNav.innerHTML = mealNav;

    document.querySelectorAll(".mealCategories").forEach((category) => {
        category.addEventListener("click", () => {

            const categoryName = category.getAttribute("data-categoryNav");

            localStorage.setItem("selectedCategory", categoryName);

            window.location.href = "meals.html";
        });
    });
}


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