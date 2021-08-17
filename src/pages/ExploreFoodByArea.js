import React, { Component } from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import FoodCard from '../components/FoodCard';
import { fetchFoodAreaSuccess, fetchFoodList,
  fetchSearchFoodArea } from '../redux/actions/foodActions';
import Header from '../components/Header';
import Footer from '../components/Footer';
import '../ExploreIngredients.css';

class ExploreFoodByArea extends Component {
  constructor() {
    super();

    this.handleFoodByArea = this.handleFoodByArea.bind(this);
  }

  componentDidMount() {
    const { fetchFoodArea, actionFetchFoodList } = this.props;
    fetchFoodArea();
    actionFetchFoodList('');
  }

  handleFoodByArea({ target }) {
    const { value } = target;
    const { actionFetchFoodList,
      actionFetchSearchFoodArea } = this.props;

    if (value === 'All') {
      actionFetchFoodList('');
    } else {
      actionFetchSearchFoodArea(value);
    }
  }

  render() {
    const { foodArea, foodCardsList } = this.props;
    return (
      <div>
        <Header title="Explorar Origem" search />
        <select
          className="dropdown"
          data-testid="explore-by-area-dropdown"
          onChange={ this.handleFoodByArea }
        >
          <option
            data-testid="All-option"
            value="All"
          >
            All
          </option>
          { foodArea && foodArea.map((item, index) => (
            <option
              key={ index }
              data-testid={ `${item.strArea}-option` }
              value={ item.strArea }
            >
              { item.strArea }
            </option>
          )) }
        </select>
        <ul>
          { foodCardsList && foodCardsList.map((item, index) => (
            <FoodCard key={ item.idMeal } food={ item } index={ index } />)) }
        </ul>
        <Footer />
      </div>
    );
  }
}

const mapStateToProps = (state) => ({
  foodArea: state.foodReducer.foodArea,
  foodCardsList: state.foodReducer.foodCardsList,
});

const mapDispatchToProps = (dispatch) => ({
  fetchFoodArea: () => dispatch(fetchFoodAreaSuccess()),
  actionFetchFoodList: (name) => dispatch(fetchFoodList(name)),
  actionFetchSearchFoodArea: (area) => dispatch(fetchSearchFoodArea(area)),
});

ExploreFoodByArea.propTypes = {
  foodArea: PropTypes.arrayOf(PropTypes.object),
  fetchFoodArea: PropTypes.func,
}.isRequired;

export default connect(mapStateToProps, mapDispatchToProps)(ExploreFoodByArea);
