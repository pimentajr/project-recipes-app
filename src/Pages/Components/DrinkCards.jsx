import React, { useContext } from 'react';
import { Link } from 'react-router-dom';
import Context from '../../Context_Configs/Context';

export default function DrinkCards() {
  const { dataDrinks } = useContext(Context);
  return (
    <div className="container">
      {
        dataDrinks !== null
          ? dataDrinks.map(({ strDrink, strDrinkThumb, idDrink }, index) => (
            <Link to={ `/bebidas/${idDrink}` } key={ strDrink }>
              <div className="col-6 d-inline-block flex-column align-items-center mt-3 mb-3" data-testid={ `${index}-recipe-card` }>
                <img
                  src={ strDrinkThumb }
                  className="food-card w-100 rounded-circle p-2"
                  data-testid={ `${index}-card-img` }
                  alt="Imagem de comida"
                />
                <h3 className="overflow-hidden d-flex align-items-center justify-content-center" data-testid={ `${index}-card-name` }>{strDrink}</h3>
              </div>
            </Link>
          ))
        // eslint-disable-next-line no-alert
          : alert('Sinto muito, não encontramos nenhuma receita para esses filtros.')
      }
    </div>
  );
}
