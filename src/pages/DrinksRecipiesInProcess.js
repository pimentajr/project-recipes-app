import React from 'react';
import { Redirect } from 'react-router-dom';
import PropTypes from 'prop-types';
import FetchApi from '../services/ApiFetch';
import ShareBtn from '../components/ShareBtn';
import FavoriteBtn from '../components/FavoriteBtn';
import DoneRecipeToLSDrink from '../components/DoneRecipesToLSDrink';

class DrinksRecipiesInProcess extends React.Component {
  constructor(props) {
    super(props);
    let recoveredInfo = [];
    const { match: { params: { id } } } = this.props;
    if (localStorage.inProgressRecipes
      && JSON.parse(localStorage.inProgressRecipes).cocktails[id]) {
      recoveredInfo = JSON.parse(localStorage.inProgressRecipes).cocktails[id];
    }
    this.state = {
      doRecipe: [],
      componentMounted: false,
      stockDrinks: recoveredInfo,
      redirectToDoneRecipe: false,
      disabledButton: true,
      ingredientState: [],
      measures: null,
    };
    this.test = this.test.bind(this);
    this.inputOnClickHandler = this.inputOnClickHandler.bind(this);
    this.onclickFinishButton = this.onclickFinishButton.bind(this);
    this.nada = this.nada.bind(this);
  }

  componentDidMount() {
    this.test();
  }

  onclickFinishButton() {
    const { match: { params: { id } } } = this.props;
    const { doRecipe } = this.state;
    DoneRecipeToLSDrink('bebida', doRecipe.drinks, id);
    this.setState({ redirectToDoneRecipe: true });
  }

  nada() {
    console.log('não estou fazendo nada');
  }

  async test() {
    const { match: { params: { id } } } = this.props;
    const obj = await FetchApi('thecocktaildb', null, null, ['details', id]);
    const measureArray = [];
    const measureObj = obj.drinks[0];
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
    console.log(obj.drinks[0]);
    const ingredientKeys = Object.entries(obj.drinks[0])
      .filter((igredients) => igredients[0]
        .includes('strIngredient') && igredients[1]);
    if (localStorage.inProgressRecipes
      && JSON.parse(localStorage.inProgressRecipes).cocktails
      && JSON.parse(localStorage.inProgressRecipes).cocktails[id]
      && JSON.parse(localStorage.inProgressRecipes).cocktails[id].length
        === ingredientKeys.length) {
      this.setState({ disabledButton: false });
    }
  }

  inputOnClickHandler(event, name) {
    const { match: { params: { id } } } = this.props;
    const { stockDrinks, ingredientState, doRecipe } = this.state;
    let filter = [];
    const ingredientKeys = Object.entries(doRecipe.drinks[0])
      .filter((igredients) => igredients[0]
        .includes('strIngredient') && igredients[1]);
    this.setState({ ingredientState: ingredientKeys });
    if (stockDrinks.some((i) => i === name)) {
      filter = stockDrinks.filter((ell) => ell !== name);
    } else {
      filter = [...stockDrinks, name];
    }
    this.setState({
      stockDrinks: filter,
    }, () => {
      const { stockDrinks: newStockDrinks } = this.state;
      let prev2 = {};
      if (localStorage.inProgressRecipes
        && JSON.parse(localStorage.inProgressRecipes).meals) {
        prev2 = JSON.parse(localStorage.inProgressRecipes).meals;
      }
      const drinks2 = {
        cocktails: {
          [id]: newStockDrinks,
        },
        meals: prev2,
      };
      if (localStorage.inProgressRecipes
        && JSON.parse(localStorage.inProgressRecipes).cocktails) {
        const prev = JSON.parse(localStorage.inProgressRecipes);
        const drinks = {
          cocktails: {
            ...prev.cocktails,
            [id]: newStockDrinks,
          },
          meals: prev2,
        };
        localStorage.inProgressRecipes = JSON.stringify(drinks);
        if (JSON.parse(localStorage.inProgressRecipes).cocktails[id].length
                === ingredientState.length) {
          this.setState({ disabledButton: false });
        } else {
          this.setState({ disabledButton: true });
        }
      } else { localStorage.inProgressRecipes = JSON.stringify(drinks2); }
    });
    event.target.parentNode.classList.toggle('do-row');
  }

  renderAll() {
    const { doRecipe, disabledButton, measures } = this.state;
    let ri = [];
    const { match: { params: { id } } } = this.props;
    if (localStorage.inProgressRecipes
      && JSON.parse(localStorage.inProgressRecipes).cocktails[id]) {
      ri = JSON.parse(localStorage.inProgressRecipes).cocktails[id];
    }
    return (
      <div>
        <img
          src={ doRecipe.drinks[0].strDrinkThumb }
          alt={ doRecipe.drinks[0].strDrink }
          data-testid="recipe-photo"
          width="350px"
          height="300px"
        />
        <h1 data-testid="recipe-title">{ doRecipe.drinks[0].strDrink }</h1>
        <ShareBtn />
        <FavoriteBtn
          details={ doRecipe.drinks }
          gatilho="bebida"
          id={ id }
          index={ -1 }
          update={ this.nada }
        />
        <p data-testid="recipe-category">{ doRecipe.drinks[0].strCategory }</p>
        <div className="ul-container">
          <ul id="input-checkbox">
            { Object.entries(doRecipe.drinks[0])
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
                    {
                      `${e[1]} ${measures[index] === undefined ? '' : '-'} 
                      ${measures[index] === undefined ? '' : measures[index]}`
                    }
                    <input
                      defaultChecked={ ri.some((item) => item === e[1]) }
                      id={ `for${index}` }
                      type="checkbox"
                      value={ `${e[1]}checked` }
                      onClick={ (event) => this.inputOnClickHandler(event, e[1]) }
                    />
                  </label>
                </li>
              )) }
          </ul>
        </div>
        <p data-testid="instructions">
          { doRecipe.drinks[0].strInstructions }
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

export default DrinksRecipiesInProcess;

DrinksRecipiesInProcess.propTypes = {
  match: PropTypes.shape(Object).isRequired,
};
