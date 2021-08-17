import React from 'react';
import PropTypes from 'react-dom';
import { useHistory } from 'react-router-dom';
import profileIcon from '../../images/profileIcon.svg';
import searchIcon from '../../images/searchIcon.svg';
import headerBarByPathname from '../../helpers/headerBarByPathname';
import '../../styles/TopHeaderBar.css';

function TopHeaderBar(props) {
  const history = useHistory();
  const { location: { pathname } } = history;
  const [pageTitle, searchButton] = headerBarByPathname(pathname);
  const { toggleSearchBar: { searchBar, setSearchBar } } = props;
  const { toggleDropDown: { dropDown, setDropDown } } = props;

  function validToggle() {
    if (pathname.includes('area')) {
      setDropDown(!dropDown);
    } else {
      setSearchBar(!searchBar);
    }
  }

  return (
    <div className="top-header-bar">
      <button
        type="button"
        data-testid="profile-top-btn"
        name="profile-top-btn"
        id="profile-top-btn"
        onClick={ () => history.push('/perfil') }
        src={ profileIcon }
      >
        <img className="altSvg" src={ profileIcon } alt="Ir para perfil" />
      </button>
      <h5 data-testid="page-title">
        {pageTitle}
      </h5>
      { searchButton
        ? (
          <button
            type="button"
            data-testid="search-top-btn"
            onClick={ () => validToggle() }
            src={ searchIcon }
          >
            <img className="altSvg" src={ searchIcon } alt="Abrir busca" />
          </button>) : null}
    </div>
  );
}

TopHeaderBar.propTypes = {
  toggleSearchBar: PropTypes.object,
}.isRequired;

export default TopHeaderBar;
