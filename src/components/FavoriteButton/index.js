import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { getFromStorage, setToStorage } from '../../helpers/utils';
import { updateFavoriteRecipes } from '../../actions/favoriteRecipes';
import WhiteHeartIcon from '../../images/whiteHeartIcon.svg';
import BlackHeartIcon from '../../images/blackHeartIcon.svg';

class FavoriteButton extends React.Component {
  constructor() {
    super();

    this.state = {
      isFavorite: false,
    };

    this.handleFavorite = this.handleFavorite.bind(this);
  }

  componentDidMount() {
    this.isFavorite();
  }

  handleFavorite() {
    const { isFavorite } = this.state;

    if (isFavorite) this.removeFromFavorites();
    else this.addToFavorites();
  }

  handleFavoriteUpdate(updatedFavoriteRecipes) {
    const { dispatchUpdateFavorites } = this.props;

    setToStorage('favoriteRecipes', updatedFavoriteRecipes);
    this.toggleState('isFavorite');
    dispatchUpdateFavorites(updatedFavoriteRecipes);
  }

  removeFromFavorites() {
    const { recipe } = this.props;
    const favoriteRecipes = getFromStorage('favoriteRecipes');

    const updatedFavoriteRecipes = favoriteRecipes
      .filter(({ id }) => id !== recipe.id);

    this.handleFavoriteUpdate(updatedFavoriteRecipes);
  }

  addToFavorites() {
    const { recipe } = this.props;
    const favoriteRecipes = getFromStorage('favoriteRecipes') || [];

    const updatedFavoriteRecipes = [...favoriteRecipes, recipe];

    this.handleFavoriteUpdate(updatedFavoriteRecipes);
  }

  toggleState(state) {
    this.setState((previousState) => ({
      [state]: !previousState[state],
    }));
  }

  isFavorite() {
    const { recipe } = this.props;
    const favoriteRecipes = getFromStorage('favoriteRecipes');

    this.setState({
      isFavorite: favoriteRecipes.some(({ id }) => id === recipe.id),
    });
  }

  render() {
    const { id, count } = this.props;
    const { isFavorite } = this.state;

    return (
      <button type="button" onClick={ () => this.handleFavorite(id) }>
        <img
          src={ isFavorite ? BlackHeartIcon : WhiteHeartIcon }
          alt="Favoritar"
          data-testid={ `${count}-horizontal-favorite-btn` }
        />
      </button>
    );
  }
}

const mapStateToProps = ({ favoriteRecipesReducer: { favoriteRecipes } }) => ({
  favoriteRecipes,
});

const mapDispatchToProps = (dispatch) => ({
  dispatchUpdateFavorites:
    (favoriteRecipes) => dispatch(updateFavoriteRecipes(favoriteRecipes)),
});

export default connect(mapStateToProps, mapDispatchToProps)(FavoriteButton);

FavoriteButton.defaultProps = {
  recipe: {},
};

FavoriteButton.propTypes = {
  count: PropTypes.number,
  favoriteRecipes: PropTypes.arrayOf(PropTypes.object),
  dispatchUpdateFavorites: PropTypes.func,
}.isRequired;
