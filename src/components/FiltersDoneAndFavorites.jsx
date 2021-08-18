import React from 'react';
import PropTypes from 'prop-types';

class FiltersDoneAndFavorites extends React.Component {
  render() {
    const { filterPerType } = this.props;
    return (
      <div style={ { display: 'flex', justifyContent: 'center' } }>
        <button
          onClick={ () => filterPerType() }
          data-testid="filter-by-all-btn"
          className="filter-category-button"
          style={ { width: '100px' } }
          type="button"
        >
          All
        </button>
        <button
          onClick={ () => filterPerType('comida') }
          data-testid="filter-by-food-btn"
          className="filter-category-button"
          style={ { width: '100px' } }
          type="button"
        >
          Food
        </button>
        <button
          onClick={ () => filterPerType('bebida') }
          data-testid="filter-by-drink-btn"
          className="filter-category-button"
          style={ { width: '100px' } }
          type="button"
        >
          Drinks
        </button>
      </div>
    );
  }
}

FiltersDoneAndFavorites.propTypes = {
  filterPerType: PropTypes.func,
}.isRequired;

export default FiltersDoneAndFavorites;
