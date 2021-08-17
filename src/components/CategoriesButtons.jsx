import PropTypes from 'prop-types';
import React, { useEffect, useState, useContext } from 'react';
import { Button } from 'react-bootstrap';
import { useDispatch } from 'react-redux';
import { fetchAPI } from '../services';
import SearchBarContext from '../context/searchBarContext';

export default function CategoriesButtons({ type }) {
  const [categories, setCategories] = useState([]);
  const { setKeyRedirect } = useContext(SearchBarContext);
  const dispatch = useDispatch();
  const six = 6;
  useEffect(() => {
    async function asyncFunc() {
      const newCategories = await fetchAPI[type].categories;
      const mapCategories = newCategories.map(({ strCategory }) => (
        { category: strCategory, checked: false }
      ));
      setCategories([{ category: 'All', checked: false }, ...mapCategories]);
    }
    asyncFunc();
  }, [type]);

  async function setCategory(value, bool) {
    if (!bool) {
      setKeyRedirect(false);
      if (value === 'All') {
        dispatch({ type: 'SET_SEARCH', search: { type: 'searchName', key: '' } });
      } else {
        dispatch({ type: 'SET_SEARCH', search: { type: 'searchCategory', key: value } });
      }
    } else {
      dispatch({ type: 'SET_SEARCH', search: { type: 'searchName', key: '' } });
    }
    const newCategories = categories.map(({ category, checked }) => {
      if (category === value) return { category, checked: !checked };
      return { category, checked: false };
    });
    setCategories(newCategories);
  }

  return (
    <div className="btn-group d-flex flex-wrap mb-3">
      {
        categories.slice(0, six).map(({ category, checked }, index) => (
          <Button
            className="border"
            variant={ checked ? 'primary' : 'light' }
            size="sm"
            key={ index }
            checked={ checked }
            data-testid={ `${category}-category-filter` }
            value={ category }
            onClick={ () => setCategory(category, checked) }
          >
            { category }
          </Button>
        ))
      }
    </div>
  );
}

CategoriesButtons.propTypes = {
  type: PropTypes.string.isRequired,
};
