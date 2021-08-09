import React, { useContext } from 'react';
import useSearchbar from '../context/useSearchbar';

function FilterButtons() {
  const { searchCategory, setSearchCategory, categories } = useContext(useSearchbar);
  const handleFilter = ({ value }) => {
    if (searchCategory === value) {
      setSearchCategory('list');
    } else { setSearchCategory(value); }
  };

  return (
    <section className="button-container">
      <button
        type="button"
        value="All"
        className="button button-filter"
        data-testid="All-category-filter"
        onClick={ () => setSearchCategory('list') }
      >
        All
      </button>
      {categories && categories.map(({ strCategory }, index) => (
        <button
          key={ index }
          type="button"
          value={ strCategory }
          className="button button-filter"
          data-testid={ `${strCategory}-category-filter` }
          onClick={ (e) => handleFilter(e.target) }
        >
          { strCategory }
        </button>
      ))}
    </section>
  );
}

export default FilterButtons;
