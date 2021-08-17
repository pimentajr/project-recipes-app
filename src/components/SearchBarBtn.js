import React, { useState } from 'react';
import PropTypes from 'prop-types';
import SearchBar from './SearchBar';
import SearchIcon from '../images/searchIcon.svg';

export default function SearchBarBtn({ haveSearchBtn, searchTrigger }) {
  const [isHidden, setHidden] = useState(true);

  return (
    <div>
      {
        haveSearchBtn
      && (
        <div>
          <button
            className="btn btn-outline-secondary"
            type="button"
            onClick={ () => (isHidden ? setHidden(false) : setHidden(true)) }
          >
            <img
              src={ SearchIcon }
              alt="Botão de procura"
              data-testid="search-top-btn"
            />
          </button>
        </div>
      )
      }
      {
        !isHidden
      && (
        <SearchBar searchTrigger={ searchTrigger } />
      )
      }
    </div>
  );
}

SearchBarBtn.propTypes = {
  haveSearchBtn: PropTypes.bool.isRequired,
  searchTrigger: PropTypes.string.isRequired,
};
