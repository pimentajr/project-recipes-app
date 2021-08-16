import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import PropTypes from 'prop-types';
import shareIcon from '../images/shareIcon.svg';
import whiteHeartIcon from '../images/whiteHeartIcon.svg';
import blackHeartIcon from '../images/blackHeartIcon.svg';
import '../App.css';

class DetalhesComidas extends Component {
  constructor() {
    super();
    this.state = {
      food: {},
      recomendations: [],
      showButton: true,
      nameButton: true,
      shareButton: false,
      favoriteButton: false,
    };
    this.fetchIdMeal = this.fetchIdMeal.bind(this);
    this.recomendationsFetch = this.recomendationsFetch.bind(this);
    this.handleStateButton = this.handleStateButton.bind(this);
    this.handleNameButton = this.handleNameButton.bind(this);
    this.shareLinkClick = this.shareLinkClick.bind(this);
    this.favoriteButtonClick = this.favoriteButtonClick.bind(this);
    this.verifyButtonState = this.verifyButtonState.bind(this);
  }

  componentDidMount() {
    const { history } = this.props;
    const { location } = history;
    const { pathname } = location;
    this.fetchIdMeal(pathname.split('/')[2]);
    this.recomendationsFetch();
    this.handleStateButton();
    this.handleNameButton();
    this.verifyButtonState();
  }

  handleStateButton() {
    const { history } = this.props;
    const { location } = history;
    const { pathname } = location;
    const urlId = pathname.split('/')[2];
    const doneRecipes = JSON.parse(localStorage.getItem('doneRecipes'));
    if (doneRecipes && doneRecipes.some(({ id }) => id === urlId)) {
      this.setState({ showButton: false });
    }
  }

  handleNameButton() {
    const { history } = this.props;
    const { location } = history;
    const { pathname } = location;
    const urlId = pathname.split('/')[2];
    const inProgressRecipes = JSON.parse(localStorage.getItem('inProgressRecipes'));
    if (inProgressRecipes && inProgressRecipes.meals[urlId]) {
      this.setState({ nameButton: false });
    }
  }

  fetchIdMeal(id) {
    fetch(`https://www.themealdb.com/api/json/v1/1/lookup.php?i=${id}`)
      .then((data) => data.json())
      .then((response) => this.setState({ food: response }));
  }

  recomendationsFetch() {
    fetch('https://www.thecocktaildb.com/api/json/v1/1/search.php?s=')
      .then((data) => data.json())
      .then((response) => this.setState({ recomendations: response }));
  }

  shareLinkClick() {
    const magicNumber = 2000;
    navigator.clipboard.writeText(window.location.href);
    this.setState({ shareButton: true });
    setTimeout(() => this.setState({
      shareButton: false,
    }), magicNumber);
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

  render() {
    const { history } = this.props;
    const { location } = history;
    const { pathname } = location;
    const id = pathname.split('/')[2];
    const { food,
      recomendations, showButton, nameButton, shareButton, favoriteButton } = this.state;
    const { meals } = food;
    const { drinks } = recomendations;
    const magicNumber = 6;
    if (!meals) { return <p>Carregando</p>; }
    const { strMealThumb, strMeal, strCategory, strInstructions, strYoutube } = meals[0];
    const ingredientes = Object.keys(meals[0]);
    const filtrados = ingredientes.filter((value) => value.includes('strIngredient'));
    const values = filtrados.map((value) => meals[0][value]);
    const onlyIngredientes = values.filter((value) => value);
    const filtradosMeasure = ingredientes.filter((value) => value.includes('strMeasure'));
    const valuesMeasure = filtradosMeasure.map((value) => meals[0][value]);
    const onlyMeasures = valuesMeasure.filter((value) => value);
    return (
      <div className="recipe-details">
        <div className="image-details">
          <img
            data-testid="recipe-photo"
            src={ strMealThumb }
            alt={ strMeal }
          />
        </div>
        <div className="div-content">
          <h3 data-testid="recipe-title">{ strMeal }</h3>
          <div className="buttons-details">
            <button
              type="button"
              data-testid="share-btn"
              onClick={ this.shareLinkClick }
              className="share-button"
            >
              {/* <img src={ shareIcon } alt="share" /> */}
              <i className="fas fa-share-alt-square" />
            </button>
            <button
              type="button"
              onClick={ this.favoriteButtonClick }
              className="like-button"
            >
              { !favoriteButton
                ? (
                // <img
                //   data-testid="favorite-btn"
                //   src={ whiteHeartIcon }
                //   alt="no-favorite"
                // />)
                  <i className="fas fa-heart like-button-notLiked" />)
                : (
                // <img
                //   data-testid="favorite-btn"
                //   src={ blackHeartIcon }
                //   alt="yes-favorite"
                // />
                  <i className="fas fa-heart like-button-liked" />
                )}
            </button>
          </div>
          {shareButton ? <span style={ { color: 'red' } }>Link copiado!</span> : null}
          <p className="category-details" data-testid="recipe-category">{ strCategory }</p>
          <p className="ingredients-details">Ingredientes:</p>
          { onlyIngredientes.map((value, index) => (
            <p
              key={ index }
              data-testid={ `${index}-ingredient-name-and-measure` }
            >
              {`${value} - ${onlyMeasures[index]}`}
            </p>)) }
          <p className="text-instructions" data-testid="instructions">{ strInstructions }</p>
          <iframe
            src={ strYoutube }
            height="200"
            width="300"
            title={ strMeal }
            data-testid="video"
          />
        </div>
        <div className="div-scroll">
          {
            drinks
            && drinks.map((value, index) => (
              index < magicNumber
            && (
              <div
                key={ index }
                data-testid={ `${index}-recomendation-card` }
                className="recomendation-card"
              >
                <img
                  className="img-card"
                  src={ value.strDrinkThumb }
                  alt={ value.strDrink }
                />
                <p data-testid={ `${index}-recomendation-title` }>{ value.strDrink }</p>
                <p>{ value.strAlcoholic }</p>
              </div>)
            ))
          }
        </div>
        {showButton
          && (
            <Link to={ `/comidas/${id}/in-progress` }>
              <div className="div-button-details">
                <button
                  data-testid="start-recipe-btn"
                  type="button"
                  className="btn-start"
                >
                  { nameButton ? 'Iniciar Receita' : 'Continuar Receita' }
                </button>
              </div>
            </Link>)}
      </div>
    );
  }
}

export default DetalhesComidas;

DetalhesComidas.propTypes = {
  history: PropTypes.oneOfType.isRequired,
};
