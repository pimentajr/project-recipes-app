import React from 'react';
import { Redirect } from 'react-router-dom';
import PropTypes from 'prop-types';
import FetchApi from '../services/ApiFetch';
import ShareBtn from '../components/ShareBtn';
import FavoriteBtn from '../components/FavoriteBtn';
import DoneRecipeToLSFood from '../components/DoneRecipesToLSFoods';

class FoodsRecipiesInProcess extends React.Component {
  constructor(props) {
    super(props);
    let recoveredInfo = [];
    const { match: { params: { id } } } = this.props;
    if (localStorage.inProgressRecipes
      && JSON.parse(localStorage.inProgressRecipes).meals[id]) {
      recoveredInfo = JSON.parse(localStorage.inProgressRecipes).meals[id];
    }
    this.state = {
      doRecipe: [],
      componentMounted: false,
      stockFoods: recoveredInfo,
      redirectToDoneRecipe: false,
      disabledButton: true,
      ingredientState: [],
      measures: null,
    };
    this.test = this.test.bind(this);
    this.changeRow = this.changeRow.bind(this);
    this.onclickFinishButton = this.onclickFinishButton.bind(this);
    this.nada = this.nada.bind(this);
  }

  componentDidMount() {
    this.test();
  }

  onclickFinishButton() {
    const { match: { params: { id } } } = this.props;
    const { doRecipe } = this.state;
    DoneRecipeToLSFood('comida', doRecipe.meals, id);
    this.setState({ redirectToDoneRecipe: true });
  }

  nada() {
    console.log('não estou fazendo nada');
  }

  async test() {
    const { match: { params: { id } } } = this.props;
    const obj = await FetchApi('themealdb', null, null, ['details', id]);
    const measureArray = [];
    const measureObj = obj.meals[0];
    Object.keys(measureObj).forEach((item) => {
      if (item.includes('strMeasure')) {
        measureArray.push(measureObj[item]);
      }
    });
    const filteredMeasures = measureArray
      .filter((item2) => (
        item2 !== ' ' && item2 !== '' && item2 !== null));
    this.setState({
      doRecipe: obj,
      componentMounted: true,
      measures: filteredMeasures,
    });
    const ingredientKeys = Object.entries(obj.meals[0])
      .filter((igredients) => igredients[0]
        .includes('strIngredient') && igredients[1]);
    if (localStorage.inProgressRecipes
      && JSON.parse(localStorage.inProgressRecipes).meals
      && JSON.parse(localStorage.inProgressRecipes).meals[id]
      && JSON.parse(localStorage.inProgressRecipes).meals[id].length
        === ingredientKeys.length) {
      this.setState({ disabledButton: false });
    }
  }

  changeRow(event, name) {
    const { match: { params: { id } } } = this.props;
    const { stockFoods, doRecipe, ingredientState } = this.state;
    const ingredientKeys = Object.entries(doRecipe.meals[0])
      .filter((igredients) => igredients[0]
        .includes('strIngredient') && igredients[1]);
    this.setState({ ingredientState: ingredientKeys });
    let filter = [];
    if (stockFoods.some((i) => i === name)) {
      filter = stockFoods.filter((ell) => ell !== name);
    } else {
      filter = [...stockFoods, name];
    }
    this.setState({
      stockFoods: filter,
    }, () => {
      const { stockFoods: newStockFoods } = this.state;
      let prev2 = {};
      if (localStorage.inProgressRecipes
        && JSON.parse(localStorage.inProgressRecipes).cocktails) {
        prev2 = JSON.parse(localStorage.inProgressRecipes).cocktails;
      }
      const foods2 = {
        meals: {
          [id]: newStockFoods,
        },
        cocktails: prev2,
      };
      if (localStorage.inProgressRecipes
        && JSON.parse(localStorage.inProgressRecipes).meals) {
        const prev = JSON.parse(localStorage.inProgressRecipes);
        const foods = {
          meals: {
            ...prev.meals,
            [id]: newStockFoods,
          },
          cocktails: prev2,
        };
        localStorage.inProgressRecipes = JSON.stringify(foods);
        if (JSON.parse(localStorage.inProgressRecipes).meals[id].length
        === ingredientState.length) {
          this.setState({ disabledButton: false });
        } else {
          this.setState({ disabledButton: true });
        }
      } else { localStorage.inProgressRecipes = JSON.stringify(foods2); }
    });
    event.target.parentNode.classList.toggle('do-row');
  }

  renderAll() {
    const { doRecipe, disabledButton, measures } = this.state;
    let ri = [];
    const { match: { params: { id } } } = this.props;
    if (localStorage.inProgressRecipes
      && JSON.parse(localStorage.inProgressRecipes).meals[id]) {
      ri = JSON.parse(localStorage.inProgressRecipes).meals[id];
    }
    return (
      <div>
        <img
          src={ doRecipe.meals[0].strMealThumb }
          alt={ doRecipe.meals[0].strMeal }
          data-testid="recipe-photo"
          width="350px"
          height="300px"
        />
        <h1 data-testid="recipe-title">{ doRecipe.meals[0].strDrink }</h1>
        <ShareBtn />
        <FavoriteBtn
          details={ doRecipe.meals }
          gatilho="comida"
          id={ id }
          index={ -1 }
          update={ this.nada }
        />
        <p data-testid="recipe-category">{ doRecipe.meals[0].strCategory }</p>
        <div className="ul-container">
          <ul id="input-checkbox">
            { Object.entries(doRecipe.meals[0])
              .filter((igredients) => igredients[0]
                .includes('strIngredient') && igredients[1])
              .map((e, index) => (
                <li
                  id={ index }
                  data-testid={ `${index}-ingredient-step` }
                  key={ index }
                >
                  <label
                    className={ ri.some((item) => item === e[1]) ? 'do-row' : '' }
                    id={ `id1${index}` }
                    htmlFor={ `for${index}` }
                  >
                    {`${e[1]} - ${measures[index]}`}
                    <input
                      defaultChecked={ ri.some((item) => item === e[1]) }
                      id={ `for${index}` }
                      type="checkbox"
                      onClick={ (event) => this.changeRow(event, e[1]) }
                    />
                  </label>
                </li>
              )) }
          </ul>
        </div>
        <p data-testid="instructions">
          { doRecipe.meals[0].strInstructions }
        </p>
        <button
          disabled={ disabledButton }
          data-testid="finish-recipe-btn"
          onClick={ this.onclickFinishButton }
          type="button"
        >
          Finalizar
        </button>
      </div>
    );
  }

  render() {
    const { componentMounted, redirectToDoneRecipe } = this.state;
    if (redirectToDoneRecipe) return <Redirect to="/receitas-feitas" />;
    return (
      <div>
        {componentMounted ? this.renderAll() : 'loading...'}
      </div>
    );
  }
}

export default FoodsRecipiesInProcess;

FoodsRecipiesInProcess.propTypes = {
  match: PropTypes.shape(Object).isRequired,
};
