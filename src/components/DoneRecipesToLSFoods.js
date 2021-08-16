function DoneRecipeToLSFood(recipeType, details, id) {
  const recipeID = id;
  let today = new Date();
  const dd = String(today.getDate()).padStart(2, '0');
  const mm = String(today.getMonth() + 1).padStart(2, '0'); // January is 0!
  const yyyy = today.getFullYear();
  today = `${dd}/${mm}/${yyyy}`;
  // código de data encontrado em: https://stackoverflow.com/questions/1531093/how-do-i-get-the-current-date-in-javascript?rq=1
  const detailObject = [{
    id: recipeID,
    type: recipeType,
    area: details[0].strArea ? details[0].strArea : '',
    category: details[0].strCategory,
    alcoholicOrNot: details[0].strAlcoholic ? details[0].strAlcoholic : '',
    name: details[0].strMeal,
    image: details[0].strMealThumb,
    doneDate: today,
    tags: details[0].strTags ? [details[0].strTags] : [],
  }];
  if (localStorage.doneRecipes) {
    const prev = JSON.parse(localStorage.doneRecipes);
    const detailObject2 = [...prev, {
      id: recipeID,
      type: recipeType,
      area: details[0].strArea ? details[0].strArea : '',
      category: details[0].strCategory,
      alcoholicOrNot: details[0].strAlcoholic ? details[0].strAlcoholic : '',
      name: details[0].strMeal,
      image: details[0].strMealThumb,
      doneDate: today,
      tags: details[0].strTags ? [details[0].strTags] : [],
    }];
    localStorage.doneRecipes = JSON.stringify(detailObject2);
  } else {
    localStorage.doneRecipes = JSON.stringify(detailObject);
  }
}

export default DoneRecipeToLSFood;
