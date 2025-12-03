let mealProducts = []
const clicked_ID = localStorage.getItem("clickedID");

async function fetchMealDetail(mealID) {
    const mealResp = await fetch(`https://www.themealdb.com/api/json/v1/1/lookup.php?i=${mealID}`);
    const mealDetails = await mealResp.json()
    console.log(mealDetails.meals);
    displaymealDetails(mealDetails.meals)
}

fetchMealDetail(clicked_ID)

function displaymealDetails(details){
    const detail = document.getElementById("secondNav");
    let anotherNav = "";

    details.forEach((meal)=>{
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

    details.forEach((information)=>{

         let ingredientsList = "";

    for(let i = 1; i <= 20; i++){
        const ingredient = information[`strIngredient${i}`];
        if (ingredient && ingredient.trim() !== "") {
            ingredientsList += `<p>${i} ${ingredient}</p>`;
        }
    }

        mainDetail += `
        <div class="imgdiv">
            <img src="${information.strMealThumb}" alt="${information.strMeal}">
        </div>
        <div class="mealInfo">
            <h2 class="mealName">${information.strMeal}</h2>
            <hr class="belowHr">
            <p class="mealCategory"> CATEGORY : ${information.strCategory}</p>
            <p class="mealSource"> Source : ${information.strSource}</p>
            <span class="mealTags"> Tags : ${information.strTags}</span>
            <div class="mealIngridents">
                <p class="ingredientsTitle">Ingredients</p>
                <div class="allIngredients">
                    ${ingredientsList}
                </div>
            </div>
        </div>
        `
    })
    info.innerHTML = mainDetail;

    
    

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