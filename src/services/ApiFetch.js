const FetchApi = async (trigger, radioOption, inputValue, list) => {
  let url = '';
  if (radioOption === 'ingrediente') {
    url = `filter.php?i=${inputValue}`;
  }
  if (radioOption === 'nome') {
    url = `search.php?s=${inputValue}`;
  }
  if (radioOption === 'primeiraLetra') {
    url = `search.php?f=${inputValue}`;
  }
  if (list === 'list') {
    url = 'list.php?c=list';
  }
  if (list === 'locations') {
    url = 'list.php?a=list';
  }
  if (list === 'location') {
    url = `filter.php?a=${radioOption}`;
  }
  if (Array.isArray(list)) {
    const catName = list[0];
    const details = list[0];
    url = `filter.php?c=${catName}`;
    if (details === 'details') {
      url = `lookup.php?i=${list[1]}`;
    }
  } if (radioOption === 'random') {
    url = 'random.php';
  } if (radioOption === 'listIngredients') {
    url = 'list.php?i=list';
  }
  try {
    const feth = await fetch(`https://www.${trigger}.com/api/json/v1/1/${url}`);
    const feth2 = await feth.json();
    return feth2;
  } catch (error) {
    return error.message;
  }
};

export default FetchApi;
