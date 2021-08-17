// FETCH PAGINA DE COMIDAS

export async function fetchFoodCategories() {
  const response = await fetch('https://www.themealdb.com/api/json/v1/1/list.php?c=list');
  const { meals } = await response.json();
  return meals;
}

async function fetchFoodSearchCategory(category) {
  const response = await fetch(`https://www.themealdb.com/api/json/v1/1/filter.php?c=${category}`);
  const { meals } = await response.json();
  return meals;
}

// FETCH PAGINA DE EXPLORAR COMIDAS

export async function fetchExploreFoodsArea() {
  const response = await fetch('https://www.themealdb.com/api/json/v1/1/list.php?a=list');
  const { meals } = await response.json();
  return meals;
}

export async function fetchExploreFoodsIngredients() {
  const response = await fetch('https://www.themealdb.com/api/json/v1/1/list.php?i=list');
  const { meals } = await response.json();
  return meals;
}

export async function fetchSearchFoodsArea(area) {
  const response = await fetch(`https://www.themealdb.com/api/json/v1/1/filter.php?a=${area}`);
  const { meals } = await response.json();
  return meals;
}

// FETCH PAGINA DE DETALHES PELO ID E DETALHES DA COMIDA
export async function fetchFoodsById(id) {
  const response = await fetch(`https://www.themealdb.com/api/json/v1/1/lookup.php?i=${id}`);
  const { meals } = await response.json();
  return meals;
}

// FETCH PAGINA DE BEBIDAS

export async function fetchCocktailsCategories() {
  const response = await fetch('https://www.thecocktaildb.com/api/json/v1/1/list.php?c=list');
  const { drinks } = await response.json();
  return drinks;
}

async function fetchCocktailsSearchCategory(category) {
  const response = await fetch(`https://www.thecocktaildb.com/api/json/v1/1/filter.php?c=${category}`);
  const { drinks } = await response.json();
  return drinks;
}

// FETCH PAGINA DE EXPLORAR BEBIDAS
export async function fetchExploreCocktailsArea() {
  const response = await fetch('https://www.thecocktaildb.com/api/json/v1/1/list.php?a=list');
  const { drinks } = await response.json();
  return drinks;
}

export async function fetchExploreCocktailsIngredients() {
  const response = await fetch('https://www.thecocktaildb.com/api/json/v1/1/list.php?i=list');
  const { drinks } = await response.json();
  return drinks;
}

// SEARCHBAR FOODAPI

export async function fetchFoodIngredient(ingrediente) {
  const response = await fetch(`https://www.themealdb.com/api/json/v1/1/filter.php?i=${ingrediente}`);
  const { meals } = await response.json();
  return meals;
}

export async function fetchFoodName(nome) {
  const response = await fetch(`https://www.themealdb.com/api/json/v1/1/search.php?s=${nome}`);
  const { meals } = await response.json();
  return meals;
}

export async function fetchFoodLetter(primeiraLetra) {
  const magicNUmber = 1;
  if (primeiraLetra.length > magicNUmber) {
    // eslint-disable-next-line no-alert
    alert('Sua busca deve conter somente 1 (um) caracter');
    return [];
  }
  const response = await fetch(`https://www.themealdb.com/api/json/v1/1/search.php?f=${primeiraLetra}`);
  const { meals } = await response.json();
  return meals;
}

// SEARCHBAR COCKTAILSAPI

export async function fetchCocktailsIngredient(ingrediente) {
  const response = await fetch(`https://www.thecocktaildb.com/api/json/v1/1/filter.php?i=${ingrediente}`);
  const { drinks } = await response.json();
  return drinks;
}

export async function fetchCocktailsName(nome) {
  const response = await fetch(`https://www.thecocktaildb.com/api/json/v1/1/search.php?s=${nome}`);
  const { drinks } = await response.json();
  return drinks;
}

export async function fetchCocktailsLetter(primeiraLetra) {
  const magicNUmber = 1;
  if (primeiraLetra.length > magicNUmber) {
    // eslint-disable-next-line no-alert
    alert('Sua busca deve conter somente 1 (um) caracter');
    return [];
  }
  const response = await fetch(`https://www.thecocktaildb.com/api/json/v1/1/search.php?f=${primeiraLetra}`);
  const { drinks } = await response.json();
  return drinks;
}

// FETCH PAGINA DE DETALHES PELO ID E DETALHES DAS BEBIDAS
export async function fetchDrinksById(id) {
  const response = await fetch(`https://www.thecocktaildb.com/api/json/v1/1/lookup.php?i=${id}`);
  const { drinks } = await response.json();
  return drinks;
}

// BUSCA COMIDA RANDOMICA

export async function fetchRandomFood() {
  const response = await fetch('https://www.themealdb.com/api/json/v1/1/random.php');
  const { meals } = await response.json();
  const id = meals[0].idMeal;
  return id;
}

// BUSCA BEBIDA RANDOMICA

export async function fetchRandomDrink() {
  const response = await fetch('https://www.thecocktaildb.com/api/json/v1/1/random.php');
  const { drinks } = await response.json();
  const id = drinks[0].idDrink;
  return id;
}

export const fetchAPI = {
  food: {
    categories: fetchFoodCategories(),
    area: fetchExploreFoodsArea(),
    ingredients: fetchExploreFoodsIngredients(),
    searchCategory: (category) => fetchFoodSearchCategory(category),
    searchIngredient: (ingredient) => fetchFoodIngredient(ingredient),
    searchArea: (area) => fetchSearchFoodsArea(area),
    searchName: (name) => fetchFoodName(name),
    searchLetter: (letter) => fetchFoodLetter(letter),
    getById: (id) => fetchFoodsById(id),
    getRandom: fetchRandomFood,
  },
  drink: {
    categories: fetchCocktailsCategories(),
    ingredients: fetchExploreCocktailsIngredients(),
    searchCategory: (category) => fetchCocktailsSearchCategory(category),
    searchIngredient: (ingredient) => fetchCocktailsIngredient(ingredient),
    searchName: (name) => fetchCocktailsName(name),
    searchLetter: (letter) => fetchCocktailsLetter(letter),
    getById: (id) => fetchDrinksById(id),
    getRandom: () => fetchRandomDrink(),
  },
};

function getIngredients(recipe) {
  const ingredientsKeys = Object.keys(recipe).reduce((acc, cur) => {
    if (cur.includes('strIngredient')) {
      return [...acc, cur];
    }
    return acc;
  }, []);

  const measureKeys = Object.keys(recipe).reduce((acc, cur) => {
    if (cur.includes('strMeasure')) {
      return [...acc, cur];
    }
    return acc;
  }, []);

  const newIngredients = measureKeys.reduce((acc, cur, index) => {
    if (recipe[cur] && recipe[cur].length > 1) {
      const obj = {
        name: recipe[ingredientsKeys[index]], measure: recipe[cur], checked: false,
      };
      return [...acc, obj];
    }
    return acc;
  }, []);

  return newIngredients;
}

export function getIds(type, recipe) {
  const verify = type.includes('omida') || type === 'food';
  return {
    id: verify ? recipe.idMeal : recipe.idDrink,
    type: verify ? 'comida' : 'bebida',
    reverseType: verify ? 'bebida' : 'comida',
    area: verify ? recipe.strArea : '',
    category: verify ? recipe.strCategory : recipe.strAlcoholic,
    name: verify ? recipe.strMeal : recipe.strDrink,
    image: verify ? recipe.strMealThumb : recipe.strDrinkThumb,
    video: (recipe.strYoutube) ? `https://www.youtube.com/embed/${recipe.strYoutube.split('=')[1]}` : null,
    instructions: recipe.strInstructions,
    similarName: verify ? 'meals' : 'cocktails',
    tags: (recipe.strTags) ? recipe.strTags.split(',').slice(0, 2) : null,
    ingredients: getIngredients(recipe),
  };
}
