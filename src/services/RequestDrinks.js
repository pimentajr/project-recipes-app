export async function getCategoriesDrink() {
  const categories = await fetch('https://www.thecocktaildb.com/api/json/v1/1/list.php?c=list');
  const result = await categories.json();
  return result.drinks;
}

export async function getAreasDrink() {
  const areas = await fetch('https://www.thecocktaildb.com/api/json/v1/1/list.php?a=list');
  const result = await areas.json();
  return result.drinks;
}

export async function getIngredients() {
  const ingredients = await fetch('https://www.thecocktaildb.com/api/json/v1/1/list.php?i=list');
  const result = await ingredients.json();
  return result.drinks;
}

export async function searchDrinkByIngredient(ingredient) {
  const ingredients = await fetch(`https://www.thecocktaildb.com/api/json/v1/1/filter.php?i=${ingredient}`);
  const result = await ingredients.json();
  return result.drinks;
}

export async function searchDrinkByFirstLetter(letter) {
  const ingredients = await fetch(`https://www.thecocktaildb.com/api/json/v1/1/search.php?f=${letter}`);
  const result = await ingredients.json();
  return result.drinks;
}

export async function searchDrinkByName(name) {
  const ingredients = await fetch(`https://www.thecocktaildb.com/api/json/v1/1/search.php?s=${name}`);
  const result = await ingredients.json();
  return result.drinks;
}

export async function searchDrinkByArea(area) {
  const ingredients = await fetch(`https://www.thecocktaildb.com/api/json/v1/1/filter.php?a=${area}`);
  const result = await ingredients.json();
  return result.drinks;
}

export async function searchDrinkById(id) {
  const ingredients = await fetch(`https://www.thecocktaildb.com/api/json/v1/1/lookup.php?i=${id}`);
  const result = await ingredients.json();
  return result.drinks;
}

export async function searchImage(ingredientImage) {
  const ingredients = await fetch(`https://www.thecocktaildb.com/images/ingredients/${ingredientImage}.png`);
  const result = await ingredients.url;
  return result;
}

export async function searchRandomDrink() {
  const randomDrink = await fetch('https://www.thecocktaildb.com/api/json/v1/1/random.php');
  const result = await randomDrink.json();
  return result.drinks[0];
}

export async function searchByCategoryDrink(category) {
  const categories = await fetch(`https://www.thecocktaildb.com/api/json/v1/1/filter.php?c=${category}`);
  const result = await categories.json();
  return result.drinks;
}

export async function searchDrinksAll() {
  const ingredients = await fetch('https://www.thecocktaildb.com/api/json/v1/1/search.php?s=');
  const result = await ingredients.json();
  return result.drinks;
}
