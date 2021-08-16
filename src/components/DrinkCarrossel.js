import React, { useState, useEffect } from 'react';
import { useHistory } from 'react-router-dom';

function DrinkCarrossel({ recomendation }) {
  const history = useHistory();
  const [recomendations, setRecomendations] = useState();
  const [showRecomendations, setShowRecomendations] = useState();
  const [startPosition, setStartPosition] = useState(1);

  useEffect(() => {
    setRecomendations(recomendation);
    if (recomendation) {
      setShowRecomendations([recomendation[0].strMeal, recomendation[1].strMeal]);
    }
  }, [recomendation]);
  function imgClickHandler(id) {
    history.push(`/comidas/${id}`);
    window.location.reload();
  }

  function nextImg() {
    const disney = 4;
    setStartPosition(startPosition + 1);
    if (startPosition >= disney) setStartPosition(0);
    setShowRecomendations([recomendation[startPosition].strMeal,
      recomendation[startPosition + 1].strMeal]);
  }

  function renderMealCarrossel() {
    return (
      <div className="container-carrossel">
        { recomendations ? recomendations
          .map((item, index) => (
            <div key={ index } className="carrossel-item">
              <button
                className={ showRecomendations.some((item2) => item2 === item.strMeal)
                  ? 'showImgCarrossel' : 'hideImgCarrossel' }
                type="button"
                onClick={ () => imgClickHandler(item.idMeal) }
              >
                <div className="carrossel-item-container">
                  <div>
                    <img
                      alt="logo"
                      src={ item.strMealThumb }
                      width="100px"
                      data-testid={ `${index}-recomendation-card` }
                    />
                  </div>
                  <div>
                    <h3 data-testid={ `${index}-recomendation-title` }>{item.strMeal}</h3>
                  </div>
                </div>
              </button>
            </div>
          )) : 'loading'}
        <div className="button-foward">
          <button type="button" onClick={ nextImg }>
            {'>'}
          </button>
        </div>
      </div>
    );
  }

  return (
    recomendation ? renderMealCarrossel() : 'loading...'
  );
}

export default DrinkCarrossel;
