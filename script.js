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

const searchInput = document.getElementById("search");

let inputValue = ""
searchInput.addEventListener("keyup", (e) => {
     inputValue = searchInput.value

     if (inputValue !== "") {
        mealItems(inputValue); 
    }
    if (inputValue === "") {
        clearMeals();
        return;
    }
})

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


async function fetchItems(){
    const response = await fetch("https://www.themealdb.com/api/json/v1/1/categories.php")
    const data = await response.json()
    data.categories.forEach((obj) => {
        mealProducts.push(obj)
    })
    displayItems(data.categories)
}
fetchItems()

function displayItems(meals) {
    const category = document.getElementById("mealsRow");
    let meal = "";

    meals.forEach((product) => {
        meal += `
            <div class="measlCategories" data-category="${product.strCategory}" data-description="${product.strCategoryDescription}">
                <h5 id="categoryTitle">${product.strCategory}</h5>
                <img src="${product.strCategoryThumb}" alt="${product.strCategory}">
            </div>
        `;
    });

    category.innerHTML = meal;
    document.querySelectorAll(".measlCategories").forEach((card) => {
        card.addEventListener("click", () =>{
            const categoryName = card.getAttribute("data-category");
            const description = card.getAttribute("data-description");
            
            // save category and description in localstorage
            localStorage.setItem("selectedCategory", categoryName);
            localStorage.setItem("selectedDescription", description);

            window.location.href = "meals.html";
        })
    })
}

async function mealItems(foodName) {
    const res = await fetch(`https://www.themealdb.com/api/json/v1/1/search.php?s=${foodName}`)
    const mealData = await res.json();
    displayMeals(mealData.meals);
}

function displayMeals(filteredMeals) {
    const mealTitle = document.getElementById("searchTitle");
    const searchedMeals = document.getElementById("searchedMeal");

    mealTitle.innerHTML = "";
    searchedMeals.innerHTML = "";

    mealTitle.innerHTML = `
        <h2>MEALS</h2>
        <div class="belowLine"></div>`;

    let mealAfter = "";

    filteredMeals.forEach((meal) => {
        mealAfter += `
            <div class="mealProduct">
                <h5 id="mealCategory">${meal.strCategory}</h5>
                <img src="${meal.strMealThumb}" alt="${meal.strMeal}">
                <span id="origin">${meal.strArea}</span>
                <h5 class="dishName">${meal.strMeal}</h5>  
            </div>`;
    });

    searchedMeals.innerHTML = mealAfter;
}


function clearMeals() {
    document.getElementById("searchTitle").innerHTML = "";
    document.getElementById("searchedMeal").innerHTML = "";
}







