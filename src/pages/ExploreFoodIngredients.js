import React, { Component } from 'react';
import { connect } from 'react-redux';
import Button from 'react-bootstrap/Button';
import PropTypes from 'prop-types';
import { foodIngredient, renderFoodIngredient } from '../redux/actions/foodActions';
import Header from '../components/Header';
import Footer from '../components/Footer';
import '../ExploreIngredients.css';

class ExploreFoodIngredients extends Component {
  componentDidMount() {
    const { actionfetchFoodIngredient } = this.props;
    actionfetchFoodIngredient();
  }

  redirectFoodIngredient(ingredient) {
    const { history, actionFoodIngredient } = this.props;
    actionFoodIngredient(ingredient);
    history.push('/comidas');
  }

  render() {
    const { fetchFoodIngredient } = this.props;
    return (
      <div>
        <Header title="Explorar Ingredientes" search={ false } />
        <ul>
          { fetchFoodIngredient.map((item, index) => (
            <Button
              className="ingredient-buttons"
              variant="outline-dark"
              key={ item.idIngredient }
              data-testid={ `${index}-ingredient-card` }
              onClick={ () => this.redirectFoodIngredient(item.strIngredient) }
            >
              <img
                src={ `https://www.themealdb.com/images/ingredients/${item.strIngredient}-Small.png` }
                alt="Food Ingredients"
                data-testid={ `${index}-card-img` }
                height="200px"
                width="200px"
              />
              <p data-testid={ `${index}-card-name` }>{ item.strIngredient }</p>
            </Button>
          ))}
        </ul>
        <Footer />
      </div>
    );
  }
}

const mapStateToProps = (state) => ({
  fetchFoodIngredient: state.foodReducer.foodIngredients,
});

const mapDispatchToProps = (dispatch) => ({
  actionfetchFoodIngredient: () => dispatch(foodIngredient()),
  actionFoodIngredient: (ingredient) => dispatch(renderFoodIngredient(ingredient)),
});

ExploreFoodIngredients.propTypes = {
  fetchFoodIngredient: PropTypes.arrayOf(PropTypes.string),
  actionfetchFoodIngredient: PropTypes.func,
}.isRequired;

export default connect(mapStateToProps, mapDispatchToProps)(ExploreFoodIngredients);
