import React, { useEffect, useState } from 'react';
import Cards from '../components/Cards';
import Footer from '../components/Footer';
import Header from '../components/Header';
import { fetchCocktailsCategorisAPI } from '../Services/Data';
import 'bootstrap/dist/css/bootstrap.min.css';
import '../App.css';

function Bebidas() {
  const [listCocktailsCategorie, setListCocktailsCategorie] = useState([]);
  const [buttonCategorie, setButtonCategorie] = useState(null);

  const [DrinkFromSearch, setDrinkFromSearch] = useState(null);

  const renderCards = () => (<Cards
    ApiCallMeals={ false }
    ApiCallCockTails
    categorie={ buttonCategorie }
    DrinkFromSearch={ DrinkFromSearch }
  />);

  const toggleButton = (listCategorie, index) => {
    if (buttonCategorie === listCategorie[index].strCategory) {
      return setButtonCategorie(null);
    }
    return setButtonCategorie(listCategorie[index].strCategory);
  };
  const getDataButton = () => {
    fetchCocktailsCategorisAPI(setListCocktailsCategorie);
    return renderCards;
  };
  useEffect(getDataButton, [buttonCategorie]);
  const renderButtonsCocktails = () => {
    if (listCocktailsCategorie.length > 0) {
      return (
        <div>
          <button
            className="btn btn-outline-dark"
            type="button"
            data-testid={ `${listCocktailsCategorie[0].strCategory}-category-filter` }
            onClick={ () => toggleButton(
              listCocktailsCategorie,
              '0',
            ) }
          >
            {listCocktailsCategorie[0].strCategory}
          </button>
          <button
            className="btn btn-outline-dark"
            type="button"
            data-testid={ `${listCocktailsCategorie[1].strCategory}-category-filter` }
            onClick={ () => toggleButton(
              listCocktailsCategorie,
              '1',
            ) }
          >
            {listCocktailsCategorie[1].strCategory}

          </button>
          <button
            type="button"
            className="btn btn-outline-dark"
            data-testid={ `${listCocktailsCategorie[2].strCategory}-category-filter` }
            onClick={ () => toggleButton(
              listCocktailsCategorie,
              '2',
            ) }
          >
            {listCocktailsCategorie[2].strCategory}

          </button>
          <button
            type="button"
            className="btn btn-outline-dark"
            data-testid={ `${listCocktailsCategorie[3].strCategory}-category-filter` }
            onClick={ () => toggleButton(
              listCocktailsCategorie,
              '3',
            ) }
          >
            {listCocktailsCategorie[3].strCategory}

          </button>
          <button
            type="button"
            className="btn btn-outline-dark"
            data-testid={ `${listCocktailsCategorie[4].strCategory}-category-filter` }
            onClick={ () => toggleButton(
              listCocktailsCategorie,
              '4',
            ) }
          >
            {listCocktailsCategorie[4].strCategory}

          </button>
          <button
            type="button"
            className="btn btn-outline-dark"
            data-testid="All-category-filter"
            onClick={ () => setButtonCategorie(null) }
          >
            All
          </button>
        </div>
      );
    }
  };
  return (
    <div>
      <Header title="Bebidas" setDrinkFromSearch={ setDrinkFromSearch } search />
      {renderButtonsCocktails()}
      {renderCards()}
      <Footer />
    </div>
  );
}

export default Bebidas;
