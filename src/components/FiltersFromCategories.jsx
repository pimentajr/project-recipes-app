import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { getPerCategoriesFromApi } from '../actions';

class FiltersFromCategories extends React.Component {
  constructor() {
    super();
    this.renderCards = this.renderCards.bind(this);
    this.onClickFiltering = this.onClickFiltering.bind(this);
    this.removeAllFilters = this.removeAllFilters.bind(this);
    this.state = {
      toggleFilters: '',
    };
  }

  async onClickFiltering(category) {
    const { foodPerCategory, updateItemsToRender, typeFood } = this.props;
    const { toggleFilters } = this.state;
    if (toggleFilters === category) {
      updateItemsToRender(true);
      this.setState({
        toggleFilters: '',
      });
    } else {
      this.setState({
        toggleFilters: category,
      });
      await foodPerCategory(typeFood, category);
      updateItemsToRender();
    }
  }

  removeAllFilters() {
    const { updateItemsToRender } = this.props;
    updateItemsToRender(true);
  }

  renderCards(itemsToRender) {
    const filteredItems = [];
    const finalIndex = 5;
    itemsToRender.forEach((item, index) => {
      if (index < finalIndex) {
        filteredItems.push(item);
      }
    });
    return filteredItems.map((item, index) => (
      <div
        key={ index }
      >
        <button
          data-testid={ `${item.strCategory}-category-filter` }
          type="button"
          className="filter-category-button"
          onClick={ () => this.onClickFiltering(item.strCategory) }
        >
          { item.strCategory }
        </button>
      </div>
    ));
  }

  render() {
    const { categories } = this.props;
    return (
      <div className="filter-category-buttons">
        <div>
          <button
            data-testid="All-category-filter"
            className="filter-category-button"
            onClick={ this.removeAllFilters }
            type="button"
          >
            All
          </button>
        </div>
        {this.renderCards(categories)}
      </div>
    );
  }
}

const mapDispatchToProps = (dispatch) => ({
  foodPerCategory: (mealsOrDrinks, category) => dispatch(
    getPerCategoriesFromApi(mealsOrDrinks, category),
  ),
});

FiltersFromCategories.propTypes = {
  categories: PropTypes.arrayOf(
    PropTypes.object,
  ).isRequired,
  foodPerCategory: PropTypes.func.isRequired,
  updateItemsToRender: PropTypes.func.isRequired,
  typeFood: PropTypes.string.isRequired,
};

export default connect(null, mapDispatchToProps)(FiltersFromCategories);
