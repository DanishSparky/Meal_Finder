const menuBtn = document.getElementById("navLogo");
const closeBtn = document.getElementById("close-btn");
const sidebar = document.getElementById("sidebar");
const searchInput = document.getElementById("search")

let mealProducts = []

menuBtn.addEventListener("click", () => {
    sidebar.style.right = "0px";
});

closeBtn.addEventListener("click", () => {
    sidebar.style.right = "-350px";
});

let inputValue = ""
searchInput.addEventListener("keyup", (e) => {
     inputValue = searchInput.value
    console.log(inputValue);

     if (inputValue !== "") {
        mealItems(inputValue); 
    }
    
})

async function fetchItems(){
    const response = await fetch("https://www.themealdb.com/api/json/v1/1/categories.php")
    const data = await response.json()
    data.categories.forEach((obj) => {
        mealProducts.push(obj)
        console.log(mealProducts);
        
    })
    displayItems(data.categories)
}
fetchItems()

function displayItems(meals){
    const category = document.getElementById("mealsRow")
    let meal = ""
    meals.forEach((product)=>{
        meal = `
        <div class="measlCategories">
        <h5 id="categoryTitle">${product.strCategory}</h5>
        <img src="${product.strCategoryThumb}" alt="${product.strCategory}">
        <a href="${product.idCategory}></a>
        </div>`
        category.insertAdjacentHTML("beforeend", meal)
    })
}

async function mealItems(foodName) {
    const res = await fetch(`https://www.themealdb.com/api/json/v1/1/search.php?s=${foodName}`)
    const mealData = await res.json();
    console.log(mealData.meals);
    displayMeals(mealData.meals);
}






