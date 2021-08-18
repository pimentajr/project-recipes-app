import React, { Component } from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import { DrinkDetailsCard, FoodRecomendation, DrinkStartRecipe } from '../components';
import { fetchDrinkID, fetchFoodRecomendations } from '../redux/actions/drinkActions';
import ReturnButton from '../components/ReturnButton';

class DrinkDetails extends Component {
  componentDidMount() {
    const { match: { params: { id } }, fetchDrinkByID, fetchFood } = this.props;
    fetchDrinkByID(id);
    fetchFood('');
  }

  render() {
    const { match: { params: { id } } } = this.props;
    return (
      <div>
        <ReturnButton />
        <DrinkDetailsCard />
        <FoodRecomendation />
        <DrinkStartRecipe id={ id } />
      </div>
    );
  }
}

const mapDispatchToProps = (dispatch) => ({
  fetchDrinkByID: (id) => dispatch(fetchDrinkID(id)),
  fetchFood: (name) => dispatch(fetchFoodRecomendations(name)),
});

DrinkDetails.propTypes = {
  fetchDrinkByID: PropTypes.func,
  fetchFood: PropTypes.func,
  match: PropTypes.object,
}.isRequire;

export default connect(null, mapDispatchToProps)(DrinkDetails);
