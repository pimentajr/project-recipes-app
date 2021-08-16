import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import PropTypes from 'prop-types';
import InProgressFoodHelper from '../components/InProgressFoodHelper';
import '../App.css';

class ProcessoComidas extends Component {
  constructor() {
    super();
    this.state = {
      food: {},
      shareButton: false,
      favoriteButton: false,
      ingredients: {},
      setIngredients: { meals: {}, cocktails: {} },
    };
    this.fetchIdMeal = this.fetchIdMeal.bind(this);
    this.shareLinkClick = this.shareLinkClick.bind(this);
    this.favoriteButtonClick = this.favoriteButtonClick.bind(this);
    this.riskDoneIngredients = this.riskDoneIngredients.bind(this);
    this.verifyStorage = this.verifyStorage.bind(this);
    this.doneRecipes = this.doneRecipes.bind(this);
  }

  componentDidMount() {
    const { history } = this.props;
    const { location } = history;
    const { pathname } = location;
    this.fetchIdMeal(pathname.split('/')[2]);
    this.verifyStorage();
  }

  verifyStorage() {
    const { history } = this.props;
    const { location } = history;
    const { pathname } = location;
    const urlId = pathname.split('/')[2];
    if (localStorage.inProgressRecipes) {
      const verifyLocal = JSON.parse(localStorage.getItem('inProgressRecipes'));
      if (verifyLocal.meals[urlId]) {
        this.setState({
          ingredients: verifyLocal.meals[urlId].reduce((acc, value) => {
            acc = { ...acc, [value]: true };
            return acc;
          }, {}),
          setIngredients: verifyLocal,
        });
      }
    }
    if (localStorage.favoriteRecipes) {
      const verifyLocal = JSON.parse(localStorage.getItem('favoriteRecipes'));
      if (verifyLocal) {
        this.setState({ favoriteButton: true });
      }
    }
  }

  fetchIdMeal(id) {
    fetch(`https://www.themealdb.com/api/json/v1/1/lookup.php?i=${id}`)
      .then((data) => data.json())
      .then((response) => this.setState({ food: response }));
  }

  shareLinkClick() {
    const magicNumber = 2000;
    const urlLocation = window.location.href.split('/');
    urlLocation.pop();
    navigator.clipboard.writeText(urlLocation.join('/'));
    this.setState({ shareButton: true });
    setTimeout(() => this.setState({ shareButton: false }), magicNumber);
  }

  verifyButtonState() {
    const { history } = this.props;
    const { location } = history;
    const { pathname } = location;
    const urlId = pathname.split('/')[2];
    const stateFavoriteButton = JSON.parse(localStorage.getItem('favoriteRecipes'));
    if (stateFavoriteButton && stateFavoriteButton.some(({ id }) => id === urlId)) {
      this.setState({
        favoriteButton: true,
      });
    }
  }

  favoriteButtonClick() {
    const { favoriteButton, food } = this.state;
    const { meals } = food;
    const obj = {
      id: meals[0].idMeal,
      type: 'comida',
      area: meals[0].strArea,
      category: meals[0].strCategory,
      alcoholicOrNot: '',
      name: meals[0].strMeal,
      image: meals[0].strMealThumb,
    };

    this.setState({
      favoriteButton: !favoriteButton,
    }, () => {
      if (!localStorage.favoriteRecipes) {
        localStorage.setItem('favoriteRecipes', JSON.stringify([obj]));
      } else {
        const favoritesRecipes = JSON.parse(localStorage.getItem('favoriteRecipes'));
        if (favoritesRecipes.some((value) => value.id === meals[0].idMeal)) {
          const attFavorite = favoritesRecipes
            .filter((value) => value.id !== meals[0].idMeal);
          localStorage.setItem('favoriteRecipes', JSON.stringify(attFavorite));
        } else {
          localStorage
            .setItem('favoriteRecipes', JSON.stringify([...favoritesRecipes, obj]));
        }
      }
    });
  }

  riskDoneIngredients({ target }) {
    const { ingredients } = this.state;
    const { checked, name } = target;
    const { history } = this.props;
    const { location } = history;
    const { pathname } = location;
    const urlId = pathname.split('/')[2];
    this.setState({
      ingredients: { ...ingredients, [name]: checked },
    }, () => {
      this.setState((prev) => ({
        setIngredients:
        { ...prev.setIngredients,
          meals: { ...prev.setIngredients.meals,
            [urlId]: Object.keys(prev.ingredients)
              .filter((value) => prev.ingredients[value]) } },
      }), () => {
        const { setIngredients } = this.state;
        localStorage.setItem('inProgressRecipes', JSON.stringify(setIngredients));
      });
    });
  }

  doneRecipes() {
    const { food } = this.state;
    const { meals } = food;
    const obj = {
      id: meals[0].idMeal,
      type: 'comida',
      area: meals[0].strArea,
      category: meals[0].strCategory,
      alcoholicOrNot: '',
      name: meals[0].strMeal,
      image: meals[0].strMealThumb,
      doneDate: new Date().toLocaleDateString('PT-BR'),
      tags: [],
    };
    if (!localStorage.doneRecipes) {
      localStorage.setItem('doneRecipes', JSON.stringify([obj]));
    } else {
      const doneRecipes = JSON.parse(localStorage.getItem('doneRecipes'));
      if (doneRecipes.some((value) => value.id === meals[0].idDrink)) {
        const attDone = doneRecipes
          .filter((value) => value.id !== meals[0].idDrink);
        localStorage.setItem('doneRecipes', JSON.stringify(attDone));
      } else {
        localStorage
          .setItem('doneRecipes', JSON.stringify([...doneRecipes, obj]));
      }
    }
  }

  render() {
    const { food, favoriteButton, shareButton, ingredients, setIngredients } = this.state;
    const { meals } = food;
    if (!meals) { return <p>Carregando</p>; }
    const { strMealThumb, strMeal, strCategory, strInstructions } = meals[0];
    const ingredientes = Object.keys(meals[0]);
    const filtrados = ingredientes.filter((value) => value.includes('strIngredient'));
    const values = filtrados.map((value) => meals[0][value]);
    const onlyIngredientes = values.filter((value) => value);
    const filtradosMeasure = ingredientes.filter((value) => value.includes('strMeasure'));
    const valuesMeasure = filtradosMeasure.map((value) => meals[0][value]);
    const onlyMeasures = valuesMeasure.filter((value) => value);
    const { history } = this.props;
    const { location } = history;
    const { pathname } = location;
    const urlId = pathname.split('/')[2];
    return (
      <div className="recipe-details">
        <div className="recipe-details">
          <InProgressFoodHelper
            strMealThumb={ strMealThumb }
            strMeal={ strMeal }
            shareLinkClick={ this.shareLinkClick }
            favoriteButtonClick={ this.favoriteButtonClick }
            favoriteButton={ favoriteButton }
            shareButton={ shareButton }
            strCategory={ strCategory }
          />
          <p className="ingredients-details">Ingredientes:</p>
          { onlyIngredientes.map((value, index) => (
            <div
              key={ index }
              data-testid={ `${index}-ingredient-step` }
            >
              <label
                style={ ingredients[value]
                  ? { textDecoration: 'line-through' } : { textDecoration: 'none' } }
                htmlFor={ `${index}-ingredient-name-and-measure` }
              >
                <input
                  id={ `${index}-ingredient-name-and-measure` }
                  type="checkbox"
                  name={ value }
                  style={ { margin: '0 8px' } }
                  onClick={ this.riskDoneIngredients }
                  defaultChecked={ ingredients[value] }
                />
                {`${value} - ${onlyMeasures[index]}`}
              </label>
            </div>
          )) }
          <p className="text-instructions" data-testid="instructions">{ strInstructions }</p>
        </div>
        <div style={ { height: '50px', width: '100vw' } } />
        <div className="footer-progress">
          <Link to="/receitas-feitas">
            <button
              data-testid="finish-recipe-btn"
              type="button"
              className="btn-start"
              onClick={ this.doneRecipes }
              disabled={ !setIngredients.meals[urlId]
              || setIngredients.meals[urlId].length !== onlyIngredientes.length }
            >
              Finalizar Receita
            </button>
          </Link>
        </div>
      </div>
    );
  }
}

export default ProcessoComidas;

ProcessoComidas.propTypes = {
  history: PropTypes.oneOfType.isRequired,
};
