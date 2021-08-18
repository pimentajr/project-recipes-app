import React from 'react';
import { Link } from 'react-router-dom';
import Context from '../../Context_Configs/Context';

export default function DrinkCategoryCards() {
  const { drinksForCategory } = React.useContext(Context);
  return (
    <div className="container">
      {
        drinksForCategory !== 0
        && drinksForCategory.map(({ strDrink, strDrinkThumb, idDrink }, i) => (
          <Link to={ `/bebidas/${idDrink}` } key={ `${strDrink}-${i}` }>
            <div className="col-6 d-inline-block flex-column align-self-center align-items-center mt-3 mb-3" data-testid={ `${i}-recipe-card` }>
              <img
                src={ strDrinkThumb }
                className="food-card w-100 rounded-circle p-2"
                data-testid={ `${i}-card-img` }
                alt="Imagem de comida"
              />
              <h3 className="text-truncate" data-testid={ `${i}-card-name` }>{strDrink}</h3>
            </div>
          </Link>
        ))
      }
    </div>
  );
}
