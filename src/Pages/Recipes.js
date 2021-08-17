import React, { useEffect, useState } from 'react';
import { useHistory } from 'react-router-dom';
import Header from '../components/Header';
import Footer from '../components/Footer';
import Cards from '../components/Cards';
import { fetchMealsCategorisAPI } from '../Services/Data';
import '../App.css';

// Usei o history para pegar o caminho da rota e fazer a condição

export default function Recipes() {
  const [listMealsCategorie, setListMealsCategorie] = useState([]);
  const [buttonCategorie, setButtonCategorie] = useState(null);

  const [foodFromSearch, setFoodFromSearch] = useState(null);

  const renderCards = () => (<Cards
    ApiCallMeals
    ApiCallCockTails={ false }
    categorie={ buttonCategorie }
    foodFromSearch={ foodFromSearch }
  />);

  const toggleButton = (listCategorie, index) => {
    if (buttonCategorie === listCategorie[index].strCategory) {
      return setButtonCategorie(null);
    }
    return setButtonCategorie(listCategorie[index].strCategory);
  };

  const getDataButton = () => {
    fetchMealsCategorisAPI(setListMealsCategorie);
    return renderCards;
  };

  useEffect(getDataButton, []);

  const renderButtons = () => {
    if (listMealsCategorie.length > 0) {
      return (
        <div>
          <button
            className="btn btn-outline-dark"
            type="button"
            data-testid={ `${listMealsCategorie[0].strCategory}-category-filter` }
            onClick={ () => toggleButton(

              listMealsCategorie,
              '0',

            ) }
          >
            {listMealsCategorie[0].strCategory}
          </button>
          <button
            className="btn btn-outline-dark"
            type="button"
            data-testid={ `${listMealsCategorie[1].strCategory}-category-filter` }
            onClick={ () => toggleButton(

              listMealsCategorie,
              '1',

            ) }
          >
            {listMealsCategorie[1].strCategory}

          </button>
          <button
            className="btn btn-outline-dark"
            type="button"
            data-testid={ `${listMealsCategorie[2].strCategory}-category-filter` }
            onClick={ () => toggleButton(

              listMealsCategorie,
              '2',

            ) }
          >
            {listMealsCategorie[2].strCategory}

          </button>
          <button
            className="btn btn-outline-dark"
            type="button"
            data-testid={ `${listMealsCategorie[3].strCategory}-category-filter` }
            onClick={ () => toggleButton(

              listMealsCategorie,
              '3',

            ) }
          >
            {listMealsCategorie[3].strCategory}

          </button>
          <button
            className="btn btn-outline-dark"
            type="button"
            data-testid={ `${listMealsCategorie[4].strCategory}-category-filter` }
            onClick={ () => toggleButton(

              listMealsCategorie,
              '4',

            ) }
          >
            {listMealsCategorie[4].strCategory}

          </button>
          <button
            className="btn btn-outline-dark"
            type="button"
            data-testid="All-category-filter"
            onClick={ () => setButtonCategorie(null) }
          >
            All

          </button>
        </div>
      );
    }
  };

  const { pathname } = useHistory().location;
  const [title, setTitle] = useState('');

  useEffect(() => {
    if (pathname.includes('comidas')) setTitle('Comidas');
    if (pathname.includes('bebidas')) setTitle('Bebidas');
  }, [pathname]);

  return (
    <div>
      <Header title={ title } setFoodFromSearch={ setFoodFromSearch } search />
      {renderButtons()}
      {renderCards()}
      <Footer />
    </div>
  );
}
