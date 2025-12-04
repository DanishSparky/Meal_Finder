let mealProducts = []
const clicked_ID = localStorage.getItem("clickedID");

const menuBtn = document.getElementById("navLogo");
const closeBtn = document.getElementById("close-btn");
const sidebar = document.getElementById("sidebar");

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



async function fetchMealDetail(mealID) {
    const mealResp = await fetch(`https://www.themealdb.com/api/json/v1/1/lookup.php?i=${mealID}`);
    const mealDetails = await mealResp.json()
    console.log(mealDetails.meals);
    displaymealDetails(mealDetails.meals)
}

fetchMealDetail(clicked_ID)

function displaymealDetails(details) {
    const detail = document.getElementById("secondNav");
    let anotherNav = "";

    details.forEach((meal) => {
        anotherNav += `
        <div class="anotherNav">
            <a href="./index.html"><i class="fa-solid fa-house" id="icon"></i></a>
            <i class="fa-solid fa-angles-right" id="arrow"></i>
            <p id="mealName">${meal.strMeal}</p>
        </div>
        `
    })
    detail.innerHTML = anotherNav;



    const info = document.getElementById("mealDetail");
    let mainDetail = "";

    details.forEach((information) => {

        let ingredientsList = "";
        for (let i = 1; i <= 20; i++) {
            const ingredient = information[`strIngredient${i}`];
            if (ingredient && ingredient.trim() !== "") {
                ingredientsList += `<p><span>${i}</span> ${ingredient}</p>`;
            }
        }


        let tagsList = "";

        if (information.strTags) {
            const tags = information.strTags.split(",");

            tags.forEach(tag => {
                if (tag.trim() !== "") {
                    tagsList += `<span class="singleTag">${tag.trim()}</span>`;
                }
            });
        }


        let measuresList = "";
        for (let i = 1; i <= 20; i++) {
            const measure = information[`strMeasure${i}`];

            if (measure && measure.trim() !== "") {
                measuresList += `
            <p>
                <i class="fa-solid fa-spoon" style="color: #e16120; margin-right: 6px;"></i>
                ${measure.trim()}
            </p>
        `;
            }
        }


        let instructionsList = "";
        let steps = information.strInstructions
            .split(".")
            .map(step => step.trim())
            .filter(step => step !== "");

        steps.forEach(step => {
            instructionsList += `
        <p>
            <i class="fa-regular fa-square-check" style="color: #e16120; margin-right: 8px;"></i>
            ${step}.
        </p>
        <br>
    `;
        });

        let mealCategory = information.strCategory

        mainDetail += `
        <div class="mealParameters">
            <img src="${information.strMealThumb}" alt="${information.strMeal}">
            <div class="mealInfo">
                <h2 class="mealName">${information.strMeal}</h2>
                <hr>
                <p class="mealCategory"> CATEGORY: <span> ${mealCategory.toUpperCase()}</span></p>
                <p class="mealSource"> Source: <span> ${information.strSource}</span></p>
                <div class="mealTags">
                    <p>Tags :</p>
                    ${tagsList}
                </div>
                <div class="mealIngridents">
                    <h5 class="ingredientsTitle">Ingredients</h5>
                    <div class="allIngredients">
                        ${ingredientsList}
                    </div>
                </div>
            </div>
        </div>

        <div class="measures">
            <h5 class="measureTitle">Measure:</h5>
            <div class="allMeasures">
                ${measuresList}
            </div>
        </div>

        <div class="instrunctions">
             <p class="instructionsTitle">Instructions:</p>
            <div class="allInstructions">
                ${instructionsList}
            </div>
        </div>

        `
    })
    info.innerHTML = mainDetail;
}





async function fetchItems() {
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
        card.addEventListener("click", () => {
            const categoryName = card.getAttribute("data-category");
            const description = card.getAttribute("data-description");

            // save category and description in localstorage
            localStorage.setItem("selectedCategory", categoryName);
            localStorage.setItem("selectedDescription", description);

            window.location.href = "meals.html";
        })
    })
}