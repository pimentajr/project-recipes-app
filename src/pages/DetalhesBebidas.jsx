import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import PropTypes from 'prop-types';
import shareIcon from '../images/shareIcon.svg';
import whiteHeartIcon from '../images/whiteHeartIcon.svg';
import blackHeartIcon from '../images/blackHeartIcon.svg';
import '../App.css';

class DetalhesBebidas extends Component {
  constructor() {
    super();
    this.state = {
      cocktail: {},
      recomendations: [],
      showButton: true,
      nameButton: true,
      shareButton: false,
      favoriteButton: false,
    };
    this.fetchIdDrink = this.fetchIdDrink.bind(this);
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
    this.fetchIdDrink(pathname.split('/')[2]);
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
      this.setState({
        showButton: false,
      });
    }
  }

  handleNameButton() {
    const { history } = this.props;
    const { location } = history;
    const { pathname } = location;
    const urlId = pathname.split('/')[2];
    const inProgressRecipes = JSON.parse(localStorage.getItem('inProgressRecipes'));
    if (inProgressRecipes && inProgressRecipes.cocktails[urlId]) {
      this.setState({ nameButton: false });
    }
  }

  fetchIdDrink(id) {
    fetch(`https://www.thecocktaildb.com/api/json/v1/1/lookup.php?i=${id}`)
      .then((data) => data.json())
      .then((response) => this.setState({
        cocktail: response,
      }));
  }

  recomendationsFetch() {
    fetch('https://www.themealdb.com/api/json/v1/1/search.php?s=')
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

  render() {
    const { history } = this.props;
    const { location } = history;
    const { pathname } = location;
    const id = pathname.split('/')[2];
    const { cocktail,
      recomendations, showButton, nameButton, shareButton, favoriteButton } = this.state;
    const { drinks } = cocktail;
    const { meals } = recomendations;
    const magicNumber = 6;
    if (!drinks) return <p>Carregando</p>;
    const { strDrinkThumb, strDrink, strAlcoholic, strInstructions } = drinks[0];
    const ingredientes = Object.keys(drinks[0]);
    const filtrados = ingredientes.filter((value) => value.includes('strIngredient'));
    const values = filtrados.map((value) => drinks[0][value]);
    const onlyIngredientes = values.filter((value) => value);
    const filtradosMeasure = ingredientes.filter((value) => value.includes('strMeasure'));
    const valuesMeasure = filtradosMeasure.map((value) => drinks[0][value]);
    const onlyMeasures = valuesMeasure.filter((value) => value);
    return (
      <div className="recipe-details">
        <div className="image-details">
          <img
            data-testid="recipe-photo"
            src={ strDrinkThumb }
            alt={ strDrink }
          />
        </div>
        <div className="div-content">
          <h3 data-testid="recipe-title">{ strDrink }</h3>
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
                // />
                  <i className="fas fa-heart like-button-notLiked" />
                )
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
          <p className="category-details" data-testid="recipe-category">{ strAlcoholic }</p>
          <p className="ingredients-details">Ingredientes:</p>
          { onlyIngredientes.map((value, index) => (
            <p
              key={ index }
              data-testid={ `${index}-ingredient-name-and-measure` }
            >
              {`${value} - ${onlyMeasures[index]}`}
            </p>)) }
          <p className="text-instructions" data-testid="instructions">{ strInstructions }</p>
        </div>
        <div className="div-scroll">
          {
            meals
            && meals.map((value, index) => (
              index < magicNumber
            && (
              <div
                data-testid={ `${index}-recomendation-card` }
                className="recomendation-card"
              >
                <img
                  className="img-card"
                  src={ value.strMealThumb }
                  alt={ value.strMeal }
                />
                <p data-testid={ `${index}-recomendation-title` }>{ value.strMeal }</p>
                <p>{ value.strCategory }</p>
              </div>)
            ))
          }
        </div>
        {showButton
          && (
            <Link to={ `/bebidas/${id}/in-progress` }>
              <div className="div-button-details">
                <button
                  data-testid="start-recipe-btn"
                  type="button"
                  className="btn-start"
                >
                  { nameButton ? 'Iniciar Receita' : 'Continuar Receita'}
                </button>
              </div>
            </Link>)}
      </div>
    );
  }
}

export default DetalhesBebidas;

DetalhesBebidas.propTypes = {
  history: PropTypes.oneOfType.isRequired,
};
