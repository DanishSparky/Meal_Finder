const menuBtn = document.getElementById("navLogo");
const closeBtn = document.getElementById("close-btn");
const sidebar = document.getElementById("sidebar");

menuBtn.addEventListener("click", () => {
    sidebar.style.right = "0px";
});

closeBtn.addEventListener("click", () => {
    sidebar.style.right = "-350px";
});



async function fetchItems(){
    const response = await fetch("https://www.themealdb.com/api/json/v1/1/categories.php")
    const data = await response.json()
    console.log(data.categories);
    displayItems(data.categories)
}
fetchItems()

function displayItems(meals){
    const category = document.getElementById("mealsRow")
    meals.map((product)=>{
        let meal = `
        <div class="measlCategories">
        <h5 id="categoryTitle">${product.strCategory}</h5>
        <img src="${product.strCategoryThumb}" alt="${product.strCategory}">
        <a href="${product.idCategory}></a>
        </div>`
        category.insertAdjacentHTML("beforeend", meal)
    })
}





