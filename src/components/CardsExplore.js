import React, { useEffect } from 'react';
import PropTypes from 'prop-types';

function CardsExplore(props) {
  const { ingredientesList, drink } = props;

  const imagemFood = 'https://www.themealdb.com/images/ingredients/';
  const imageDrink = 'https://www.thecocktaildb.com/images/ingredients/';

  const renderIngredientesList = (ingredientesListRender) => {
    const maxListRender = 12;
    if (drink) {
      return (
        <div className="row row-cols-2 row-cols-sm-2 g-3">
          {ingredientesListRender.filter((__, index) => index < maxListRender)
            .map((ingrediente, index) => (
              <div key={ index }>

                <div
                  data-testid={ `${index}-ingredient-card` }
                  className="cards"
                >
                  <div className="card-body">
                    <h5
                      data-testid={ `${index}-card-name` }
                      className="card-title"
                    >
                      {ingrediente.strIngredient1}
                    </h5>
                    <img
                      className="card-img card-img-bottom"
                      src={ `${imageDrink}${ingrediente.strIngredient1}-Small.png` }
                      alt={ ingrediente.strIngredient1 }
                      data-testid={ `${index}-card-img` }
                    />
                  </div>
                </div>
              </div>
            ))}
        </div>);
    }
    if (!drink) {
      return (
        <div className="row row-cols-2 row-cols-sm-2 g-3">
          {ingredientesListRender.filter((__, index) => index < maxListRender)
            .map((ingrediente, index) => (
              <div key={ index } className="col">
                <div
                  data-testid={ `${index}-ingredient-card` }
                  className="cards"
                >
                  <div className="card-body">
                    <h5
                      data-testid={ `${index}-card-name` }
                      className="card-title"
                    >
                      {ingrediente.strIngredient}
                    </h5>
                    <img
                      className="card-img-bottom"
                      src={ `${imagemFood}${ingrediente.strIngredient}-Small.png` }
                      alt={ ingrediente.strIngredient }
                      data-testid={ `${index}-card-img` }
                    />
                  </div>
                </div>
              </div>
            ))}

        </div>);
    }
  };

  const getData = () => {
    if (ingredientesList) {
      return renderIngredientesList(ingredientesList);
    }
  };

  useEffect(getData, []);

  return (
    <div>
      {renderIngredientesList(ingredientesList)}
    </div>

  );
}
CardsExplore.propTypes = {
  ingredientesList: PropTypes.arrayOf(PropTypes.object).isRequired,
  drink: PropTypes.bool.isRequired,
};
export default CardsExplore;
