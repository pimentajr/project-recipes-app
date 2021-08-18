export async function getCategoriesFood() {
  const categories = await fetch('https://www.themealdb.com/api/json/v1/1/categories.php');
  const result = await categories.json();
  return result.categories;
}

export async function getAreasFood() {
  const areas = await fetch('https://www.themealdb.com/api/json/v1/1/list.php?a=list');
  const result = await areas.json();
  return result.meals;
}

export async function getIngredients() {
  const ingredients = await fetch('https://www.themealdb.com/api/json/v1/1/list.php?i=list');
  const result = await ingredients.json();
  return result.meals;
}

export async function searchByIngredient(ingredient) {
  const ingredients = await fetch(`https://www.themealdb.com/api/json/v1/1/filter.php?i=${ingredient}`);
  const result = await ingredients.json();
  return result.meals;
}

export async function searchByFirstLetter(letter) {
  const ingredients = await fetch(`https://www.themealdb.com/api/json/v1/1/search.php?f=${letter}`);
  const result = await ingredients.json();
  return result.meals;
}

export async function searchByName(name) {
  const ingredients = await fetch(`https://www.themealdb.com/api/json/v1/1/search.php?s=${name}`);
  const result = await ingredients.json();
  return result.meals;
}

export async function searchByArea(area) {
  const ingredients = await fetch(`https://www.themealdb.com/api/json/v1/1/filter.php?a=${area}`);
  const result = await ingredients.json();
  return result.meals;
}

export async function searchById(id) {
  const ingredients = await fetch(`https://www.themealdb.com/api/json/v1/1/lookup.php?i=${id}`);
  const result = await ingredients.json();
  return result.meals;
}

export async function searchByCategoryFood(category) {
  const categories = await fetch(`https://www.themealdb.com/api/json/v1/1/filter.php?c=${category}`);
  const result = await categories.json();
  return result.meals;
}

export async function searchRandomMeal() {
  const randomMeal = await fetch('https://www.themealdb.com/api/json/v1/1/random.php');
  const result = await randomMeal.json();
  return result.meals[0];
}

export async function searchFoodsAll() {
  const ingredients = await fetch('https://www.themealdb.com/api/json/v1/1/search.php?s=');
  const result = await ingredients.json();
  return result.meals;
}
