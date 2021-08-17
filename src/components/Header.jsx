import React, { useContext } from 'react';
import RecipesContext from '../context/RecipesContext';
import DropdownAreas from './subcomponents/DropdownAreas';
import SearchBar from './subcomponents/SearchBar';
import TopHeaderBar from './subcomponents/TopHeaderBar';

function Header() {
  const { searchBar, setSearchBar, dropDown, setDropDown } = useContext(RecipesContext);

  const sec = 10000;
  setTimeout(() => {
  }, sec);

  return (
    <header>
      <TopHeaderBar
        toggleSearchBar={ { searchBar, setSearchBar } }
        toggleDropDown={ { dropDown, setDropDown } }
      />
      {searchBar ? <SearchBar /> || <DropdownAreas /> : null}
      {/*  <h3 data-testid="page-title">{title}</h3> */}
    </header>
  );
}

export default Header;
