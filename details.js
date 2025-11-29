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