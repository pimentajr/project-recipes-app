import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import PropTypes from 'prop-types';
import InProgressDrinksHelper from '../components/InProgressDrinksHelper';
import '../App.css';

class ProcessoBebidas extends Component {
  constructor() {
    super();
    this.state = {
      cocktail: {},
      shareButton: false,
      favoriteButton: false,
      ingredients: {},
      setIngredients: { meals: {}, cocktails: {} },
    };
    this.fetchIdDrink = this.fetchIdDrink.bind(this);
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
    this.fetchIdDrink(pathname.split('/')[2]);
    this.verifyStorage();
  }

  verifyStorage() {
    const { history } = this.props;
    const { location } = history;
    const { pathname } = location;
    const urlId = pathname.split('/')[2];
    if (localStorage.inProgressRecipes) {
      const verifyLocal = JSON.parse(localStorage.getItem('inProgressRecipes'));
      if (verifyLocal.cocktails[urlId]) {
        this.setState({
          ingredients: verifyLocal.cocktails[urlId].reduce((acc, value) => {
            console.log(value);
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

  fetchIdDrink(id) {
    fetch(`https://www.thecocktaildb.com/api/json/v1/1/lookup.php?i=${id}`)
      .then((data) => data.json())
      .then((response) => this.setState({ cocktail: response }));
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
      this.setState({ favoriteButton: true });
    }
  }

  favoriteButtonClick() {
    const { favoriteButton, cocktail } = this.state;
    const { drinks } = cocktail;
    const obj = {
      id: drinks[0].idDrink,
      type: 'bebida',
      area: '',
      category: drinks[0].strCategory,
      alcoholicOrNot: drinks[0].strAlcoholic,
      name: drinks[0].strDrink,
      image: drinks[0].strDrinkThumb,
    };

    this.setState({
      favoriteButton: !favoriteButton,
    }, () => {
      if (!localStorage.favoriteRecipes) {
        localStorage.setItem('favoriteRecipes', JSON.stringify([obj]));
      } else {
        const favoritesRecipes = JSON.parse(localStorage.getItem('favoriteRecipes'));
        if (favoritesRecipes.some((value) => value.id === drinks[0].idDrink)) {
          const attFavorite = favoritesRecipes
            .filter((value) => value.id !== drinks[0].idDrink);
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
          cocktails: { ...prev.setIngredients.cocktails,
            [urlId]: Object.keys(prev.ingredients)
              .filter((value) => prev.ingredients[value]) } },
      }), () => {
        const { setIngredients } = this.state;
        localStorage.setItem('inProgressRecipes', JSON.stringify(setIngredients));
      });
    });
  }

  doneRecipes() {
    const { cocktail } = this.state;
    const { drinks } = cocktail;
    const obj = {
      id: drinks[0].idDrink,
      type: 'bebida',
      area: '',
      category: drinks[0].strCategory,
      alcoholicOrNot: drinks[0].strAlcoholic,
      name: drinks[0].strDrink,
      image: drinks[0].strDrinkThumb,
      doneDate: new Date().toLocaleDateString('PT-BR'),
      tags: [],
    };
    if (!localStorage.doneRecipes) {
      localStorage.setItem('doneRecipes', JSON.stringify([obj]));
    } else {
      const doneRecipes = JSON.parse(localStorage.getItem('doneRecipes'));
      if (doneRecipes.some((value) => value.id === drinks[0].idDrink)) {
        const attDone = doneRecipes
          .filter((value) => value.id !== drinks[0].idDrink);
        localStorage.setItem('doneRecipes', JSON.stringify(attDone));
      } else {
        localStorage
          .setItem('doneRecipes', JSON.stringify([...doneRecipes, obj]));
      }
    }
  }

  render() {
    const { cocktail,
      shareButton, favoriteButton, ingredients, setIngredients } = this.state;
    const { drinks } = cocktail;
    if (!drinks) return <p>Carregando</p>;
    const { strDrinkThumb, strDrink, strAlcoholic, strInstructions } = drinks[0];
    const ingredientes = Object.keys(drinks[0]);
    const filtrados = ingredientes.filter((value) => value.includes('strIngredient'));
    const values = filtrados.map((value) => drinks[0][value]);
    const onlyIngredientes = values.filter((value) => value);
    const filtradosMeasure = ingredientes.filter((value) => value.includes('strMeasure'));
    const valuesMeasure = filtradosMeasure.map((value) => drinks[0][value]);
    const onlyMeasures = valuesMeasure.filter((value) => value);
    const { history } = this.props;
    const { location } = history;
    const { pathname } = location;
    const urlId = pathname.split('/')[2];
    return (
      <div className="recipe-details">
        <div className="recipe-details">
          <InProgressDrinksHelper
            strDrinkThumb={ strDrinkThumb }
            strDrink={ strDrink }
            shareLinkClick={ this.shareLinkClick }
            favoriteButtonClick={ this.favoriteButtonClick }
            favoriteButton={ favoriteButton }
            shareButton={ shareButton }
            strAlcoholic={ strAlcoholic }
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
              disabled={ !setIngredients.cocktails[urlId]
              || setIngredients.cocktails[urlId].length !== onlyIngredientes.length }
            >
              Finalizar Receita
            </button>
          </Link>
        </div>
      </div>
    );
  }
}

export default ProcessoBebidas;

ProcessoBebidas.propTypes = {
  history: PropTypes.oneOfType.isRequired,
};
