import { fetchAPIName, fetchAPICategory,
  fetchAPICategoryFilter, fetchAPIByID,
  fetchFoodRandom, fetchFoodIngredient,
  fetchFoodArea, fetchFoodIngredientSearch,
  fetchSearchFoodByArea } from '../../services/fetchAPIFood';
import { fetchAPIName as fetchRecomendations } from '../../services/fetchAPIDrink';

export const FOOD_LIST_SUCCESS = 'FOOD_LIST_SUCCESS';
export const FOOD_CATEGORY_SUCCESS = 'FOOD_CATEGORY_SUCCESS';
export const FOOD_LIST_CATEGORY_SUCCESS = 'FOOD_LIST_CATEGORY_SUCCESS';
export const UPDATE_CATEGORY = 'UPDATE_CATEGORY';
export const FOOD_DETAILS_ID_SUCCESS = 'FOOD_DETAILS_ID_SUCCESS';
export const DRINK_RECOMENDATIONS_SUCCESS = 'DRINK_RECOMENDATIONS_SUCCESS';
export const FOOD_INGREDIENTS = 'FOOD_INGREDIENTS';
export const FOOD_AREA = 'FOOD_AREA';
export const SAVE_FAVORITES = 'SAVE_FAVORITES';
export const RENDER_FOOD_INGREDIENTS = 'RENDER_FOOD_INGREDIENTS';
export const SEARCH_FOOD_AREA = 'SEARCH_FOOD_AREA';

export const foodListSuccess = (payload) => ({
  type: FOOD_LIST_SUCCESS,
  payload,
});

export const fetchFoodList = (name) => async (dispatch) => {
  const returnFetch = await fetchAPIName(name);
  dispatch(foodListSuccess(returnFetch));
};

const foodCategorySuccess = (payload) => ({
  type: FOOD_CATEGORY_SUCCESS,
  payload,
});

export const fetchFoodCategory = (category) => async (dispatch) => {
  const returnFetch = await fetchAPICategory(category);
  dispatch(foodCategorySuccess(returnFetch));
};

const foodListByCategorySuccess = (payload) => ({
  type: FOOD_LIST_CATEGORY_SUCCESS,
  payload,
});

const drinkRecomendations = (payload) => ({
  type: DRINK_RECOMENDATIONS_SUCCESS,
  payload,
});

export const fetchDrinkRecomendations = (name) => async (dispatch) => {
  const returnFetch = await fetchRecomendations(name);
  dispatch(drinkRecomendations(returnFetch));
};

export const updateCategory = (payload) => ({
  type: UPDATE_CATEGORY,
  payload,
});

export const fetchFoodListByCategory = (category) => async (dispatch) => {
  dispatch(updateCategory(category));
  const returnFetch = await fetchAPICategoryFilter(category);
  dispatch(foodListByCategorySuccess(returnFetch));
};

const foodDetailsIDSuccess = (payload) => ({
  type: FOOD_DETAILS_ID_SUCCESS,
  payload,
});

export const fetchFoodID = (id) => async (dispatch) => {
  const returnFetch = await fetchAPIByID(id);
  dispatch(foodDetailsIDSuccess(returnFetch));
};

export const saveFavoritesRedux = (payload) => ({
  type: SAVE_FAVORITES,
  payload,
});

export const saveFavoriteRecipe = (id) => async (dispatch) => {
  const returnFetch = await fetchAPIByID(id);
  const genericObj = {
    id: returnFetch[0].idMeal,
    type: 'comida',
    area: returnFetch[0].strArea,
    category: returnFetch[0].strCategory,
    alcoholicOrNot: '',
    name: returnFetch[0].strMeal,
    image: returnFetch[0].strMealThumb,
  };
  const favoriteRecipes = JSON.parse(localStorage.getItem('favoriteRecipes'));
  if (favoriteRecipes === null) {
    localStorage.setItem('favoriteRecipes', JSON.stringify([genericObj]));
    dispatch(saveFavoritesRedux(genericObj));
  } else {
    const newFavoriteRecipes = [...favoriteRecipes, genericObj];
    localStorage.setItem('favoriteRecipes', JSON.stringify(newFavoriteRecipes));
    dispatch(saveFavoritesRedux(newFavoriteRecipes));
  }
};

export const removeFavoriteRecipe = (id) => (dispatch) => {
  const favoriteRecipes = JSON.parse(localStorage.getItem('favoriteRecipes'));
  const newFavoriteRecipes = favoriteRecipes
    .filter((item) => !(item.id === id && item.type === 'comida'));
  localStorage.setItem('favoriteRecipes', JSON.stringify(newFavoriteRecipes));
  dispatch(saveFavoritesRedux(newFavoriteRecipes));
};

export const randomFoodId = () => async () => {
  const returnFetch = await fetchFoodRandom();
  return returnFetch;
};

const searchFoodIngredient = (payload) => ({
  type: FOOD_INGREDIENTS,
  payload,
});

export const foodIngredient = () => async (dispatch) => {
  const returnFetch = await fetchFoodIngredient();
  dispatch(searchFoodIngredient(returnFetch));
};

const foodArea = (payload) => ({
  type: FOOD_AREA,
  payload,
});

export const fetchFoodAreaSuccess = () => async (dispatch) => {
  const returnFetch = await fetchFoodArea();
  dispatch(foodArea(returnFetch));
};

export const renderFoodIngredient = (payload) => ({
  type: RENDER_FOOD_INGREDIENTS,
  payload,
});

export const fetchFoodIngredientList = (ingredient) => async (dispatch) => {
  const returnFetch = await fetchFoodIngredientSearch(ingredient);
  dispatch(foodListSuccess(returnFetch));
};

export const saveDoneRecipe = (id) => async () => {
  const returnFetch = await fetchAPIByID(id);
  const date = new Date();
  const genericObj = {
    id: returnFetch[0].idMeal,
    type: 'comida',
    area: returnFetch[0].strArea,
    category: returnFetch[0].strCategory,
    alcoholicOrNot: '',
    name: returnFetch[0].strMeal,
    image: returnFetch[0].strMealThumb,
    doneDate: date.toLocaleDateString('pt-BR'),
    tags: returnFetch[0].strTags ? returnFetch[0].strTags.split(',') : '',
  };
  const doneRecipes = JSON.parse(localStorage.getItem('doneRecipes'));
  if (doneRecipes === null) {
    localStorage.setItem('doneRecipes', JSON.stringify([genericObj]));
  } else {
    const newDoneRecipes = [...doneRecipes, genericObj];
    localStorage.setItem('doneRecipes', JSON.stringify(newDoneRecipes));
  }
};

export const searchFoodByArea = (payload) => ({
  type: SEARCH_FOOD_AREA,
  payload,
});

export const fetchSearchFoodArea = (area) => async (dispatch) => {
  const returnFetch = await fetchSearchFoodByArea(area);
  dispatch(searchFoodByArea(returnFetch));
};
