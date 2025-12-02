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