import React, { Component } from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import { saveFavoriteRecipe, removeFavoriteRecipe } from '../redux/actions/foodActions';
import whiteHeartIcon from '../images/whiteHeartIcon.svg';
import blackHeartIcon from '../images/blackHeartIcon.svg';

class FavoriteButton extends Component {
  constructor() {
    super();

    this.state = {
      whiteHeart: true,
    };

    this.handleFavoriteClick = this.handleFavoriteClick.bind(this);
    this.setFavoriteIcon = this.setFavoriteIcon.bind(this);
  }

  componentDidMount() {
    this.handleHeart();
    const { id } = this.props;
    const favoriteMeals = JSON.parse(localStorage.getItem('favoriteRecipes'));
    if (favoriteMeals && favoriteMeals.find((item) => item.id === id)) {
      this.setFavoriteIcon();
    }
  }

  componentDidUpdate() {
    this.handleHeart();
  }

  handleHeart() {
    const { id } = this.props;
    const { whiteHeart } = this.state;
    const favoriteMeals = JSON.parse(localStorage.getItem('favoriteRecipes'));
    if (whiteHeart && favoriteMeals && favoriteMeals.find((item) => item.id === id)) {
      this.setFavoriteIcon();
    }
  }

  handleFavoriteClick() {
    const { favoriteRecipes, id, removeRecipes } = this.props;
    const { whiteHeart } = this.state;
    if (whiteHeart === true) {
      favoriteRecipes(id);
    }
    if (whiteHeart === false) {
      removeRecipes(id);
    }
    this.setState((prevState) => ({
      whiteHeart: !prevState.whiteHeart,
    }));
  }

  setFavoriteIcon() {
    this.setState({
      whiteHeart: false,
    });
  }

  render() {
    const { whiteHeart } = this.state;
    const { test } = this.props;
    return (
      <button
        className="button"
        type="button"
        onClick={ () => this.handleFavoriteClick() }
      >
        <img
          data-testid={ test }
          src={ whiteHeart ? whiteHeartIcon : blackHeartIcon }
          alt="favorite food button"
          width="120%"
        />
      </button>
    );
  }
}

const mapDispatchToProps = (dispatch) => ({
  favoriteRecipes: (id) => dispatch(saveFavoriteRecipe(id)),
  removeRecipes: (id) => dispatch(removeFavoriteRecipe(id)),
});

FavoriteButton.propTypes = {
  id: PropTypes.number,
  favoriteRecipes: PropTypes.func,
  removeRecipes: PropTypes.func,
}.isRequired;

export default connect(null, mapDispatchToProps)(FavoriteButton);
