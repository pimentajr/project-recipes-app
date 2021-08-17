import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';
import PropTypes from 'prop-types';
import Button from 'react-bootstrap/Button';
import Card from 'react-bootstrap/Card';
import { Header } from '../components';
import DrinkFavoriteButton from '../components/DrinkFavoriteButton';
import DrinkShareButton from '../components/DrinkShareButton';
import FavoriteButton from '../components/FavoriteButton';
import ShareButton from '../components/ShareButton';
import { saveFavoritesRedux } from '../redux/actions/foodActions';
import '../Favorities.css';

class FavoriteRecipes extends Component {
  constructor() {
    super();
    this.state = {
      filter: '',
    };
  }

  componentDidMount() {
    const { updateFavorites } = this.props;
    const localFavorites = JSON.parse(localStorage.getItem('favoriteRecipes'));
    updateFavorites(localFavorites);
  }

  FilterList(filter) {
    this.setState({
      filter,
    });
  }

  render() {
    const { favoriteRecipes } = this.props;
    const { filter } = this.state;
    return (
      <div>
        <Header title="Receitas Favoritas" search={ false } />
        <div className="div-category-filter">
          <Button
            size="sm"
            variant="outline-dark"
            className="category-buttons-filter"
            data-testid="filter-by-all-btn"
            onClick={ () => this.FilterList('') }
          >
            All
          </Button>
          <Button
            size="sm"
            variant="outline-dark"
            className="category-buttons-filter"
            data-testid="filter-by-food-btn"
            onClick={ () => this.FilterList('comida') }
          >
            Food
          </Button>
          <Button
            size="sm"
            variant="outline-dark"
            className="category-buttons-filter"
            data-testid="filter-by-drink-btn"
            onClick={ () => this.FilterList('bebida') }
          >
            Drink
          </Button>
        </div>
        {favoriteRecipes && favoriteRecipes.filter((item) => item.type.includes(filter))
          .map((item, index) => {
            if (item.type === 'comida') {
              return (
                <Card
                  key={ index }
                  style={ { width: '16rem' } }
                  className="done-recipes-card"
                >
                  <li key={ item.id }>
                    <Link to={ `/comidas/${item.id}` }>
                      <Card.Img
                        variant="top"
                        height="200px"
                        width="300px"
                        data-testid={ `${index}-horizontal-image` }
                        src={ item.image }
                        alt="foto da receita"
                      />
                    </Link>
                    <Card.Body>
                      <Card.Title
                        className="done-recipe-title"
                        data-testid={ `${index}-horizontal-top-text` }
                      >
                        { `${item.area} - ${item.category}` }
                      </Card.Title>
                      <Card.Title
                        className="done-recipe-title"
                        data-testid={ `${index}-horizontal-name` }
                      >
                        <Link to={ `/comidas/${item.id}` }>
                          { item.name }
                        </Link>
                      </Card.Title>
                      <ShareButton
                        test={ `${index}-horizontal-share-btn` }
                        id={ item.id }
                      />
                      <FavoriteButton
                        test={ `${index}-horizontal-favorite-btn` }
                        id={ item.id }
                      />
                    </Card.Body>
                  </li>
                </Card>
              );
            }
            return (
              <Card
                style={ { width: '16rem' } }
                className="done-recipes-card"
                key={ item.id }
              >
                <li>
                  <Link to={ `/bebidas/${item.id}` }>
                    <Card.Img
                      variant="top"
                      height="200px"
                      width="300px"
                      data-testid={ `${index}-horizontal-image` }
                      src={ item.image }
                      alt="foto da receita"
                    />
                  </Link>
                  <Card.Body>

                    <Card.Title
                      className="done-recipe-title"
                      data-testid={ `${index}-horizontal-top-text` }
                    >
                      { item.alcoholicOrNot }
                    </Card.Title>
                    <Card.Title
                      data-testid={ `${index}-horizontal-name` }
                    >
                      <Link to={ `/bebidas/${item.id}` }>
                        { item.name }
                      </Link>
                    </Card.Title>
                    <DrinkShareButton
                      test={ `${index}-horizontal-share-btn` }
                      id={ item.id }
                    />
                    <DrinkFavoriteButton
                      test={ `${index}-horizontal-favorite-btn` }
                      id={ item.id }
                    />
                  </Card.Body>
                </li>
              </Card>
            );
          })}
      </div>
    );
  }
}

const mapStateToProps = (state) => ({
  favoriteRecipes: state.foodReducer.favorites,
});

const mapDispatchToProps = (dispatch) => ({
  updateFavorites: (list) => dispatch(saveFavoritesRedux(list)),
});

FavoriteRecipes.propTypes = {
  favoriteRecipes: PropTypes.array,
  updateFavorites: PropTypes.func,
}.isRequired;

export default connect(mapStateToProps, mapDispatchToProps)(FavoriteRecipes);
