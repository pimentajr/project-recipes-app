import React from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import Cards from '../components/Cards';
import Footer from '../components/Footer';
import { getCategoriesFromApi, getFoodFromApi } from '../actions';
import FiltersFromCategories from '../components/FiltersFromCategories';
import Header from '../components/Header';

class Comidas extends React.Component {
  constructor() {
    super();
    this.state = {
      itemsToRender: [],
      renderOneOrNot: true,
    };
    this.prepareItemsOnLoad = this.prepareItemsOnLoad.bind(this);
    this.updateFoods = this.updateFoods.bind(this);
  }

  componentDidMount() {
    this.prepareItemsOnLoad();
  }

  updateFoods(all) {
    if (all) {
      const { foodsDataBase } = this.props;
      this.setState({
        itemsToRender: foodsDataBase,
        renderOneOrNot: true,
      });
    } else {
      const { filteredFoodsPerCategory } = this.props;
      this.setState({
        itemsToRender: filteredFoodsPerCategory,
        renderOneOrNot: false,
      });
    }
  }

  async prepareItemsOnLoad() {
    const { getFoods, foodsDataBase } = this.props;
    if (foodsDataBase.length > 0) {
      this.setState({
        itemsToRender: foodsDataBase,
      });
    } else {
      await getFoods('https://www.themealdb.com/api/json/v1/1/search.php?s=');
      this.updateFromCategories();
    }
  }

  updateFromCategories() {
    const { foodsDataBase, getCategories } = this.props;
    getCategories('meals');
    this.setState({
      itemsToRender: foodsDataBase,
    });
  }

  render() {
    const { categories } = this.props;
    const { itemsToRender, renderOneOrNot } = this.state;
    const showSearchButton = true;
    return (
      <div>
        <Header
          title="Comidas"
          showSearchButton={ showSearchButton }
          updateItemsToRender={ this.updateFoods }
          typeFood="food"
        />
        <FiltersFromCategories
          categories={ categories }
          updateItemsToRender={ this.updateFoods }
          typeFood="meals"
        />
        <Cards
          className="recipe-cards"
          itemsToRender={ itemsToRender }
          renderOneOrNot={ renderOneOrNot }
          typeFood="food"
        />
        <div style={ { height: '60px' } } />
        <Footer />
      </div>
    );
  }
}

const mapStateToProps = (state) => ({
  foodsDataBase: state.foodsReducer.foodsFromApi,
  categories: state.foodsReducer.categories,
  filteredFoodsPerCategory: state.foodsReducer.filteredPerCategory,
});

const mapDispatchToProps = (dispatch) => ({
  getFoods: (url) => dispatch(getFoodFromApi(url)),
  getCategories: (mealsOrDrinks) => dispatch(getCategoriesFromApi(mealsOrDrinks)),
});

Comidas.propTypes = {
  getFoods: PropTypes.func.isRequired,
  getCategories: PropTypes.func.isRequired,
  foodsDataBase: PropTypes.arrayOf(
    PropTypes.object,
  ).isRequired,
  categories: PropTypes.arrayOf(
    PropTypes.object,
  ).isRequired,
  filteredFoodsPerCategory: PropTypes.arrayOf(
    PropTypes.object,
  ).isRequired,
};

export default connect(mapStateToProps, mapDispatchToProps)(Comidas);
